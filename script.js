const statusDisplay = document.querySelector('.game--status');


let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];



const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!!!!!`;
const currentPlayerTurn = () => `it's ${currentPlayer}'s turn`;


statusDisplay.innerHTML = currentPlayerTurn();

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


function handleCellPlayed(clickedCell, clickedcellEvent) {
    
    gameState[clickedcellEvent] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();

}

function handleResultValidation() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const windCondition = winningConditions[i];
        let a = gameState[windCondition[0]];
        let b = gameState[windCondition[1]];
        let c = gameState[windCondition[2]];
        if ( a == '' || b == '' || c == ''){
            continue;
        }
        if ( a === b && b == c ){
            roundWon = true;
                break
        }
    }
        if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();

}
 
function handleCellClick(clickedcellEvent) {

    const clickedCell = clickedcellEvent.target;
    const clickedcellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedcellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedcellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell =>  cell.innerHTML = ""); 

}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);
    