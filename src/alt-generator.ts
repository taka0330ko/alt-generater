type PuterLike = {
    ai?: {
        chat?: (...args: unknown[]) => Promise<unknown>;
    };
    fs?: {
        write?: (path: string, file: File) => Promise<{ path?: string }>;
        delete?: (path: string) => Promise<unknown>;
    };
};

const textArea = document.getElementById('text-area');
const geneBtn = document.getElementById('generateBtn');
const loadingScreen = document.getElementById('loadingScreen');

import { initLoadingAnimation } from "./loadingAnimation.js";
import { getCurrentFile } from './file-state.js';


export function initGenerateAlt(){
    generateAlt();
}

function generateAlt() {
    if (textArea instanceof HTMLTextAreaElement && geneBtn instanceof HTMLButtonElement) {
        geneBtn?.addEventListener('click', async () => {
            const currentFile = getCurrentFile()
            const puter = getPuter();

            if (!currentFile) {
                textArea.value = 'Please select an image first.';
                return;
            }

            if (!puter?.ai?.chat) {
                textArea.value = 'Puter.js is not loaded. Check the network request for https://js.puter.com/v2/.';
                return;
            }

            geneBtn.disabled = true;
            textArea.disabled = true;
            textArea.classList.add('cursor-not-allowed');
            geneBtn.classList.add('cursor-not-allowed');
            startLoadingAnimation();

            try {
                textArea.value = await generateAltText(puter, currentFile);
            } catch (err) {
                console.error(err);
                textArea.value = `Failed to generate alt text: ${err instanceof Error ? err.message : String(err)}`;
            } finally {
                geneBtn.disabled = false;
                textArea.disabled = false;
                textArea.classList.remove('cursor-not-allowed');
                geneBtn.classList.remove('cursor-not-allowed');
                stopLoadingAnimation();
            }
        })
    }
};

function getPuter(): PuterLike | undefined {
    return (globalThis as typeof globalThis & { puter?: PuterLike }).puter;
}

async function generateAltText(puter: PuterLike, image: File): Promise<string> {
    const prompt = 'Generate concise, accurate alt text for this image. Return only the alt text, without quotes or labels.';
    const options = { model: 'gpt-5-nano' };
    const chat = puter.ai?.chat;

    if (!chat) {
        throw new Error('Puter AI chat is not available.');
    }

    try {
        const response = await chat(prompt, image, options);
        return responseText(response);
    } catch (directError) {
        if (!puter.fs?.write || !puter.fs.delete) {
            throw directError;
        }

        let uploadedPath: string | undefined;

        try {
            const puterFile = await puter.fs.write(`alt-generator-${Date.now()}-${image.name}`, image);
            uploadedPath = puterFile.path;

            if (!uploadedPath) {
                throw new Error('Puter did not return an uploaded file path.');
            }

            const response = await chat([
                {
                    role: 'user',
                    content: [
                        {
                            type: 'file',
                            puter_path: uploadedPath,
                        },
                        {
                            type: 'text',
                            text: prompt,
                        },
                    ],
                },
            ], options);

            return responseText(response);
        } catch (fallbackError) {
            throw new Error(
                `Direct image analysis failed (${errorMessage(directError)}). Fallback upload analysis failed (${errorMessage(fallbackError)}).`
            );
        } finally {
            if (uploadedPath) {
                await puter.fs.delete(uploadedPath).catch(console.error);
            }
        }
    }
}

function responseText(response: unknown): string {
    if (typeof response === 'string') return response;
    if (!response || typeof response !== 'object') return String(response);

    const data = response as {
        text?: unknown;
        content?: unknown;
        message?: unknown;
    };

    const message = data.message;
    if (typeof message === 'string') return message;

    if (message && typeof message === 'object') {
        const messageData = message as { text?: unknown; content?: unknown };

        if (typeof messageData.content === 'string') return messageData.content;
        if (Array.isArray(messageData.content)) {
            return messageData.content
                .map((part) => {
                    if (!part || typeof part !== 'object') return '';
                    const contentPart = part as { text?: unknown; content?: unknown };
                    return typeof contentPart.text === 'string'
                        ? contentPart.text
                        : typeof contentPart.content === 'string'
                            ? contentPart.content
                            : '';
                })
                .filter(Boolean)
                .join('\n');
        }

        if (typeof messageData.text === 'string') return messageData.text;
    }

    if (typeof data.text === 'string') return data.text;
    if (typeof data.content === 'string') return data.content;

    console.log('Unexpected Puter response:', response);
    return String(response);
}

function errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

function startLoadingAnimation() {
    loadingScreen?.classList.remove('hidden');
    initLoadingAnimation();
}

function stopLoadingAnimation() {
    loadingScreen?.classList.add('hidden');
    document.querySelectorAll('.loading-bubble').forEach((bubble) => {
        bubble.remove();
    })
}
