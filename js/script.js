document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const gameContainer = document.getElementById('game-container');
    const startScreen = document.getElementById('start-screen');
    const gameCanvas = document.getElementById('gameCanvas');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');

    let eggs = [];
    let eggsBroken = 0;
    let timeLeft = 60;
    let eggInterval;

    startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    startGame();
    });

    function drawEgg(x, y) {
    const egg = {
        x,
        y,
        width: 40,
        height: 60,
        speedX: Math.random() * 9 - 9,
        speedY: Math.random() * 9 - 9,
    };
    eggs.push(egg);

    const ctx = gameCanvas.getContext('2d');
    ctx.beginPath();
      ctx.ellipse(x, y, egg.width / 2, egg.height / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'lightgoldenrodyellow'; // Cambio de color de los huevos
    ctx.fill();
    ctx.closePath();
    }

    function startGame() {
    const ctx = gameCanvas.getContext('2d');

    eggInterval = setInterval(() => {
        for (let i = 0; i < 2; i++) {
        const fromSide = Math.random() < 0.2;
          const x = fromSide ? Math.random() * 50 : gameCanvas.width - Math.random() * 50;
          const y = Math.random() * (gameCanvas.height - 60) + 30;
        drawEgg(x, y);
        }
    }, 2000);

    function moveEggs() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        eggs.forEach((egg, index) => {
        egg.x += egg.speedX;
        egg.y += egg.speedY;

        if (egg.x - egg.width / 2 < 0 || egg.x + egg.width / 2 > gameCanvas.width) {
            egg.speedX *= -1;
        }
        if (egg.y - egg.height / 2 < 0 || egg.y + egg.height / 2 > gameCanvas.height) {
            egg.speedY *= -1;
        }

        ctx.beginPath();
          ctx.ellipse(egg.x, egg.y, egg.width / 2, egg.height / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'lightgoldenrodyellow';
        ctx.fill();
        ctx.closePath();
        });

        requestAnimationFrame(moveEggs);
    }

    moveEggs();

    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
        clearInterval(countdown);
        clearInterval(eggInterval);
        eggs = [];
        timeLeft = 0;
        scoreDisplay.textContent = `Huevos rotos: ${eggsBroken}`;
        scoreDisplay.style.display = 'block';
        resetButton.style.display = 'block';
        resetButton.style.backgroundColor = 'dodgerblue';
        resetButton.style.color = 'white';
        resetButton.style.border = 'none';
        resetButton.style.padding = '10px 20px';
        resetButton.style.borderRadius = '5px';
        resetButton.style.marginTop = '20px';
        resetButton.style.cursor = 'pointer';
        resetButton.style.fontSize = '16px';
        resetButton.style.transition = 'background-color 0.3s ease';
          resetButton.style.margin = 'auto'; // Centra el botón de reinicio

        resetButton.addEventListener('mouseover', () => {
            resetButton.style.backgroundColor = 'royalblue';
        });

        resetButton.addEventListener('mouseout', () => {
            resetButton.style.backgroundColor = 'dodgerblue';
        });

        gameContainer.style.backgroundColor = '#BD8C98';
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
    }, 1000);

    resetButton.addEventListener('click', () => {
        eggs = [];
        eggsBroken = 0;
        timeLeft = 60;
        scoreDisplay.textContent = 'Huevos rotos: 0';
        scoreDisplay.style.display = 'none';
        resetButton.style.display = 'none';
        startScreen.style.display = 'block';
        gameContainer.style.display = 'none';
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    });

    gameCanvas.addEventListener('click', (event) => {
        const rect = gameCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (let i = 0; i < eggs.length; i++) {
        const egg = eggs[i];
        if (
            x > egg.x - egg.width / 2 &&
            x < egg.x + egg.width / 2 &&
            y > egg.y - egg.height / 2 &&
            y < egg.y + egg.height / 2
        ) {
            eggs.splice(i, 1);
            eggsBroken++;
            scoreDisplay.textContent = `Huevos rotos: ${eggsBroken}`;
            ctx.clearRect(egg.x - egg.width / 2, egg.y - egg.height / 2, egg.width, egg.height);
            break;
        }
        }
    });
    }
});