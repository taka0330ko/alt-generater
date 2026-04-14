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
const loadingScreen = document.getElementById('loadingScreen');
const geneBtn = document.getElementById('generateBtn');
const toggleBtn = document.querySelector('.switch-input');

let currentFile: File | undefined;

function toggleTheme(){
    toggleBtn?.addEventListener('click', ()=>{
  document.documentElement.classList.toggle('dark');
    })
}

function previewFile(file: File | undefined) {
    currentFile = file;

    if (file) {
        figureImage?.setAttribute('src', URL.createObjectURL(file));
        figure?.classList.remove('hidden');
        uploadIcon?.classList.add('hidden');

        if (geneBtn instanceof HTMLButtonElement) {
            geneBtn.disabled = false;
        }
    } else {
        figure?.classList.add('hidden');
        uploadIcon?.classList.remove('hidden');

        if (geneBtn instanceof HTMLButtonElement) {
            geneBtn.disabled = true;
        }
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

function generateAlt() {
    if (textArea instanceof HTMLTextAreaElement && geneBtn instanceof HTMLButtonElement) {
        geneBtn?.addEventListener('click', async () => {
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

function copy() {
    copyBtn?.addEventListener('click', async () => {
        if (!(textArea instanceof HTMLTextAreaElement)) return;
        if (!copyBtnLabel) return;
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

function loadingAnimation() {
    const bubbles = [
        { x: 8, y: 10, size: 72, delay: 0, float: 14, duration: 5 },
        { x: 68, y: 12, size: 66, delay: -8, float: 20, duration: 6 },
        { x: 45, y: 12, size: 86, delay: -4, float: 30, duration: 6 },
        { x: 12, y: 68, size: 58, delay: -10, float: 12, duration: 9 },
        { x: 18, y: 68, size: 88, delay: -2, float: 16, duration: 4 },
        { x: 23, y: 38, size: 62, delay: -8, float: 12, duration: 9 },
        { x: 6, y: 48, size: 48, delay: -18, float: 22, duration: 5 },
        { x: 76, y: 58, size: 64, delay: -12, float: 18, duration: 7 },
        { x: 36, y: 48, size: 96, delay: -16, float: 16, duration: 5.5 },
        { x: 58, y: 50, size: 96, delay: -6, float: 16, duration: 9.5 },
    ];

    bubbles.forEach(({ x, y, size, delay, float, duration }) => {
        const bubble = document.createElement('span');
        bubble.classList.add("bubble-sm", "loading-bubble");
        bubble.style.left = `${x}%`;
        bubble.style.top = `${y}%`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.setProperty('--float-distance', `${float}px`);
        bubble.style.setProperty('--float-duration', `${duration}s`);
        bubble.style.animationDelay = `0s, ${delay}s`;
        loadingScreen?.appendChild(bubble);
    })
}

function startLoadingAnimation() {
    loadingScreen?.classList.remove('hidden');
    loadingAnimation();
}

function stopLoadingAnimation() {
    loadingScreen?.classList.add('hidden');
    document.querySelectorAll('.loading-bubble').forEach((bubble) => {
        bubble.remove();
    })
}

generateAlt();
toggleTheme();
copy();
inputPreview();
dragAndDrop();
