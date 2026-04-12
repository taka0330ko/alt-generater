declare const puter: any;

const dragZone = document.getElementById('container');
const input = document.getElementById('imgInput') as HTMLInputElement | null;
const figure = document.getElementById('figure');
const figureImage = document.getElementById('figureImage');
const textArea = document.getElementById('text-area');
const uploadArea = document.getElementById('uploadArea');
const uploadIcon = document.getElementById('uploadIcon');
const copyBtn = document.getElementById('copyBtn');
const copyBtnLabel = document.getElementById('copyBtnLabel');


const geneBtn = document.getElementById('generateBtn');

function previewFile(file: File | undefined) {
    if (file) {
        figureImage?.setAttribute('src', URL.createObjectURL(file));
        figure?.classList.remove('hidden');
        uploadIcon?.classList.add('hidden');
        generateAlt(file)
    } else {
        figure?.classList.add('hidden');
        uploadIcon?.classList.remove('hidden');
    }
}

function dragAndDrop() {
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragZone?.classList.add('drag-overlay');
    })
    window.addEventListener('dragleave', () => {
        dragZone?.classList.remove('drag-overlay');
    })

    window.addEventListener("drop", (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files[0];
        dragZone?.classList.remove('drag-overlay');
        previewFile(file);
    });
}

function inputPreview() {
    uploadArea?.addEventListener('click', () => {
        input?.click()
    })

    input?.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        previewFile(file);
    })
}

function generateAlt(file: File | undefined) {
    if (file && textArea instanceof HTMLTextAreaElement) {
        geneBtn?.addEventListener('click', async () => {
            textArea.value = "Generating..."
            try {
                const res = await puter?.ai.chat("generate alt text of this picture", file);
                textArea.value = res.message.content;
                console.log(res.message.content);
            } catch (err) {
                console.error(err);
            }
        })
    }
};

function copy() {
    copyBtn?.addEventListener('click', async () => {
        if (!(textArea instanceof HTMLTextAreaElement)) return;
        if(!copyBtnLabel) return;
        try {
            await navigator.clipboard.writeText(textArea?.value);
            copyBtnLabel.textContent = "Copied!"
            setTimeout(() => {
            copyBtnLabel.textContent = "Copy Text"
            }, 2000)

        } catch (err) {
            console.error(err);
        }
    })
}

copy();

inputPreview();
dragAndDrop();
