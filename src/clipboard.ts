const textArea = document.getElementById('text-area');
const copyBtn = document.getElementById('copyBtn');
const copyBtnLabel = document.getElementById('copyBtnLabel');

export function initCopy(){
    copy();
}

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
