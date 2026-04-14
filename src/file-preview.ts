const dragZone = document.getElementById('container');
const input = document.getElementById('imgInput') as HTMLInputElement | null;
const figure = document.getElementById('figure');
const figureImage = document.getElementById('figureImage');
const uploadArea = document.getElementById('uploadArea');
const uploadIcon = document.getElementById('uploadIcon');
const geneBtn = document.getElementById('generateBtn');

import { setCurrentFile } from './file-state.js';

export function initFileInput(){
inputPreview();
}

export function initDragAndDrop(){
    dragAndDrop();
}

function previewFile(file: File | undefined) {
    setCurrentFile(file)
    
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
