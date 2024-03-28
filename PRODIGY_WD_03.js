    let currentPlayer = 'X';
    let cells = document.querySelectorAll('.cell');
    let gameEnded = false;
    let aiMode = false;

    function handleCellClick(event) {
        if (!event.target.classList.contains('cell') || event.target.textContent !== '' || gameEnded) return;

        const cellIndex = parseInt(event.target.getAttribute('data-index'));
        cells[cellIndex].textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameEnded = true;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameEnded = true;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (aiMode && currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
    }

    function checkWin() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function checkDraw() {
        return Array.from(cells).every(cell => cell.textContent !== '');
    }

    function aiMove() {
        if (gameEnded) return;
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = currentPlayer;

        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameEnded = true;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameEnded = true;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameEnded = false;
    }

    function togglePlayerMode() {
        aiMode = !aiMode;
        resetGame();
        document.querySelector('.controls button:nth-child(2)').textContent = aiMode ? 'Play with Friend' : 'Play with AI';
    }
