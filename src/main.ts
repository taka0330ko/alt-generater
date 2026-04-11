// Entry point for browser-side initialization.

const dragZone = document.getElementById('container')
console.log(dragZone);


function dragAndDrop() {
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragZone?.classList.add('drag-overlay')
    })
    window.addEventListener('dragleave', () => {
        dragZone?.classList.remove('drag-overlay')
    })

    window.addEventListener("drop", (e) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        dragZone?.classList.remove('drag-overlay')
        console.log(files);

    });
}
dragAndDrop();