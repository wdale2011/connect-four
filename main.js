const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');

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
    
    // change what is disabled

}