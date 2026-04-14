const loadingScreen = document.getElementById('loadingScreen');


export function initLoadingAnimation(){
    loadingAnimation();
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

