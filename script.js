const headerSection = document.getElementById('headerSection');
const gameContainer = document.getElementById('game-container');

let gameState = 'waiting'; // 'waiting', 'ready', 'now', 'tooSoon', 'result'
let timeoutId;
let startTime;

function showBlueInstructions() {
    gameContainer.innerHTML = `
        <div style="font-size:2.2rem; margin-bottom:18px; color:#fff; font-weight:500;">
            When the red box turns green, click as quickly as you can
        </div>
        <div style="font-size:1.3rem; color:#fff;">
            Click anywhere to start.
        </div>
    `;
}

function showRed() {
    gameContainer.innerHTML = `
        <div style="font-size:2.8rem; color:#fff; font-weight:700; letter-spacing:1px;">WAIT FOR GREEN</div>
    `;
}

function showGreen() {
    gameContainer.innerHTML = `
        <div style="font-size:3.5rem; color:#fff; font-weight:800; letter-spacing:2px;">CLICK!</div>
    `;
}

function showTooSoon() {
    gameContainer.innerHTML = `
        <div style="font-size:3.2rem; color:#fff; font-weight:800; margin-bottom:14px;">Too soon!</div>
        <div style="font-size:1.3rem; color:#fff;">Click to try again!</div>
    `;
}

function showResult(ms) {
    gameContainer.innerHTML = `
        <div style="font-size:3rem; color:#fff; font-weight:800; margin-bottom:14px;">
            <span style="font-size:2.2rem; vertical-align:middle;">⏱️</span> ${ms} ms
        </div>
        <div style="font-size:1.2rem; color:#fff;">Click to keep going</div>
    `;
}

function resetGame() {
    gameState = 'waiting';
    headerSection.style.backgroundColor = '#2196f3';
    showBlueInstructions();
}

function startGame() {
    gameState = 'ready';
    headerSection.style.backgroundColor = 'red';
    showRed();
    timeoutId = setTimeout(() => {
        gameState = 'now';
        headerSection.style.backgroundColor = 'green';
        startTime = Date.now();
        showGreen();
    }, Math.floor(Math.random() * 3000) + 2000);
}

function handleHeaderClick() {
    if (gameState === 'waiting') {
        startGame();
    } else if (gameState === 'ready') {
        clearTimeout(timeoutId);
        gameState = 'tooSoon';
        headerSection.style.backgroundColor = '#2196f3';
        showTooSoon();
    } else if (gameState === 'now') {
        const reactionTime = Date.now() - startTime;
        gameState = 'result';
        headerSection.style.backgroundColor = '#2196f3';
        showResult(reactionTime);
    } else if (gameState === 'tooSoon' || gameState === 'result') {
        resetGame();
    }
}

headerSection.addEventListener('click', handleHeaderClick);
resetGame();

fetch('https://your-app.onrender.com/login', { ... });