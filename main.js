const board = document.getElementById('board');

// setup board
// bounds: i j
// directions i j

let boardHtml = '';
for (let row = 5; row >= 0; row--) {
    for (let col = 0; col < 7; col++) {
        boardHtml += `
            <div class="slot">
                <label for="slot${col}${row}">
                    <input type="checkbox" name="slot${col}${row}" id="slot${col}${row}">
                </label>
            </div>`;
    }
}
//Set the board's html
board.innerHTML = boardHtml;