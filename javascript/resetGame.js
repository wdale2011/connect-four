import {board, audio, background, button, turnIndicator, roundNumber} from './constants.js';
import {runTurn} from './main.js';

function resetGame () {
    let boardHtml = '';
    for (let row = 5; row >= 0; row--) {
        for (let col = 0; col < 7; col++) {
            boardHtml += `
                <div class="slot">
                    <label for="slot${col}${row}">
                        <input type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row=${row} data-col="${col}">
                    </label>
                </div>`;
        }
    }
    //Reset the board's html
    board.innerHTML = boardHtml;
    //Reset the victory art, music, and hide button
    audio.src='';
    background.className='';
    button.className='hidden';
    //Reset players and board state
    turnIndicator.innerHTML=`<span class="player1" id="player-indicator">Player 1</span> turn`;
    document.querySelectorAll('input').forEach(input => input.addEventListener('change', runTurn));
    return true;
}

export {resetGame}