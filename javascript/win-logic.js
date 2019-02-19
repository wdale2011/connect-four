import {BOARDCOLS, BOARDROWS} from './constants.js'

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
export {checkWin}