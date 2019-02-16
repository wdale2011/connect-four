const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');
const turnIndicator = document.getElementById('turn-indicator');
const background = document.getElementById('background');

const BOARDCOLS = 7;
const BOARDROWS = 6;
// setup board
// bounds: i j
// directions i j

let boardHtml = '';
for (let row = 5; row >= 0; row--) {
    for (let col = 0; col < 7; col++) {
        boardHtml += `
            <div class="slot">
                <label for="slot${col}${row}">
                    <input onchange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row=${row} data-col="${col}">
                </label>
            </div>`;
    }
}
//Set the board's html
board.innerHTML = boardHtml;

let player1Turn = true;

function runTurn(input) {

    // change color of label
    input.parentElement.className = player1Turn ? 'player1' : 'player2';

    // disable the input
    input.disabled = true;
    // enable the slot at (row + 1, col)
    const { row, col } = input.dataset;
    // check if input is on the top row
    if (row < BOARDROWS - 1) {
        const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
        neighbor.disabled = false;
    }

    const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');

    //Check Win
    if (isWin) {
        turnIndicator.innerHTML = `<span class='${player1Turn ? 'player1' : 'player2'}'id="player-indicator">${player1Turn ? 'USA' : 'USSR'}</span> Wins!!!`
        document.querySelectorAll('.slot input[type=checkbox]').forEach(slot => slot.disabled = true);
        return;
    }

    // change who's turn it is
    player1Turn = !player1Turn;
    
    // update player indicator text
    if (player1Turn) {
        playerIndicator.innerText = 'Player 1'
        playerIndicator.className = 'player1'
    } else {
        playerIndicator.innerText = 'Player 2'
        playerIndicator.className = 'player2'
    }

    //Update win text (win celebrations)
}

//Check win
function checkWin (col, row, currentPlayer) {
    return checkVertical(col, row, currentPlayer)
    || checkHorizontal(col, row, currentPlayer)
    || checkDiagonal(col, row, currentPlayer);
}

//Check vertical
function checkVertical (col, row, currentPlayer) {

if (row < 3) return false; //cannot connect 4 if it's only stacked 3 or less

for (let j = row - 1; j > row - 4; j--) {
    const currentSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currentSlotPlayer !== currentPlayer) return false;
    }

    return true;
}

//Check horizontal
function checkHorizontal(col, row, currentPlayer) {
    let sameColorNeighbors = 0;

    //Check right
    for (let i = col + 1; i < col +4; i++) {
        //Break if out of bounds
        if (i >= BOARDCOLS) break;
        const currentSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
        else break;
    }
    
    //Check Left
    for (let i = col - 1; i >= col - 3; i--) {
        //Break if out of bounds
        if (i < 0) break;
        const currentSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
        if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
        else break;
    }

    return sameColorNeighbors >= 3;
}

//Check Diagonal
function checkDiagonal(col, row, currentPlayer){
    return checkUpLeft(col, row, currentPlayer) || checkUpRight(col, row, currentPlayer)
}

    //Search up-left
    function checkUpLeft(col, row, currentPlayer){
    let sameColorNeighbors = 0;
    for (let i = 1; i < 4; i++) {
    //Break if out of bounds
        if (col - i < 0 || row + i >= BOARDROWS) break;
        const currentSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
        if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
        else break;
    }

    //Down-right
    for (let i = 1; i < 4; i++) {
        //Break if out of bounds
            if (col + i >= BOARDCOLS || row - i < 0) break;
            const currentSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
            if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
            else break;
        }

    return sameColorNeighbors >= 3
}

function checkUpRight(col, row, currentPlayer){
    let sameColorNeighbors = 0;
    for (let i = 1; i < 4; i++) {
    //Break if out of bounds
        if (col + i >= BOARDCOLS || row + i >= BOARDROWS) break;
        const currentSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
        if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
        else break;
    }

    //Down-right
    for (let i = 1; i < 4; i++) {
        //Break if out of bounds
            if (col - i < 0 || row - i < 0) break;
            const currentSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
            if (currentSlotPlayer === currentPlayer) sameColorNeighbors += 1;
            else break;
        }


    return sameColorNeighbors >= 3
}
