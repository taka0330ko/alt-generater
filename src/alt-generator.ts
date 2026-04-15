declare const puter: any;

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
            geneBtn.disabled = true;
            textArea.disabled = true;
            textArea.classList.add('cursor-not-allowed');
            geneBtn.classList.add('cursor-not-allowed');
            startLoadingAnimation();

            try {
                const res = await puter?.ai.chat("generate alt text of this picture", currentFile);
                textArea.value = res.message.content;
            } catch (err) {
                console.error(err);
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