const squareItem = Array.from(document.querySelectorAll('.game--board--grid--item'));
let playerText = document.querySelector('.game--player--text');
const restartBtn = document.querySelector('.game--restart--btn');
const winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winner-color') // need to make style for this
const fontColor = getComputedStyle(document.body).getPropertyValue('--text-color') // need to make style for this

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    squareItem.forEach(square => {
        square.addEventListener('click', clickOutcome)
    });
}

function clickOutcome(e) {
    const id = e.target.dataset.index;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        playerText.innerText = `${currentPlayer}'s turn`;

        if (playerHasWon() !== false) {
            playerText.innerText = `${currentPlayer} has won!`;
            squareItem.forEach(square => {
                square.removeEventListener('click', clickOutcome);
            });
            let winning_squares = playerHasWon();

            winning_squares.map((square) => {
                squareItem[square].style.color = winnerIndicator;
            });
        } else if (spaces.every(space => space !== null)) {
            playerText.innerText = `It's a draw!`;
        }
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

restartBtn.addEventListener('click', restartGame);

const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left col
    [1, 4, 7], // middle col
    [2, 5, 8], // right col
    [0, 4, 8], // left diagonal
    [2, 4, 6] // right diagonal
];

function playerHasWon() {
    for (const condition of winningConditions) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}


function restartGame() {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    squareItem.forEach(square => {
        square.innerText = '';
        square.style.color = '#fff';
        square.addEventListener('click', clickOutcome);
    });

    playerText.innerText = ``;

    currentPlayer = X_TEXT;
}

startGame();