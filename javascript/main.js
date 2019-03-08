import { checkWin } from "./win-logic.js";
import {
  BOARDCOLS,
  BOARDROWS,
  board,
  turnIndicator,
  background,
  audio,
  button,
  usScoreText,
  ussrScoreText
} from "./constants.js";
import { resetGame } from "./resetGame.js";

let playerIndicator = document.getElementById("player-indicator");
let resetTrigger = false;

// setup board
// bounds: i j
// directions i j

//Scores
let usScore = 0;
let ussrScore = 0;

let boardHtml = "";
for (let row = 5; row >= 0; row--) {
  for (let col = 0; col < 7; col++) {
    boardHtml += `
            <div class="slot grid-item" data-column=${col}>
                <label for="slot${col}${row}">
                    <input type="checkbox" ${
                      row > 0 ? "disabled" : ""
                    } name="slot${col}${row}" id="slot${col}${row}" data-row=${row} data-col="${col}">
                </label>
            </div>`;
  }
}
//Set the board's html
board.innerHTML = boardHtml;

document
  .querySelectorAll("input")
  .forEach(input => input.addEventListener("change", runTurn));

let player1Turn = true;

function runTurn(event) {
  //Fixes bug with game reset
  if (resetTrigger) {
    playerIndicator = document.getElementById("player-indicator");
    resetTrigger = false;
  }

  const input = event.target;

  // change color of label
  input.parentElement.className = player1Turn ? "player1" : "player2";

  // disable the input
  input.disabled = true;
  // enable the slot at (row + 1, col)
  const { row, col } = input.dataset;
  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  const isWin = checkWin(
    parseInt(col),
    parseInt(row),
    player1Turn ? "player1" : "player2"
  );

  //If it is a win...
  if (isWin) {
    turnIndicator.innerHTML = `<span class="${
      player1Turn ? "player1" : "player2"
    }" id="player-indicator">${
      player1Turn ? "The United States" : "The Soviet Union"
    }</span> Wins!`;

    background.className = `${player1Turn ? "america" : "soviet"}`;

    audio.src = `${
      player1Turn
        ? "./music/TheStarSpangledBanner.mp3"
        : "./music/ussr_national_anthem_instrumental.mp3"
    }`;

    document
      .querySelectorAll(".slot input[type=checkbox]")
      .forEach(slot => (slot.disabled = true));

    //Show and activate reset game button
    button.onclick = resetHandler;
    button.className = "";

    //Add points
    if (player1Turn === true) {
      usScore = usScore + 1;
      usScoreText.innerText = `USA : ${usScore}`;
    } else {
      ussrScore = ussrScore + 1;
      ussrScoreText.innerText = `USSR : ${ussrScore}`;
    }
  }

  // change who's turn it is
  player1Turn = !player1Turn;

  // update player indicator text
  if (player1Turn) {
    playerIndicator.innerText = "Player 1";
    playerIndicator.className = "player1";
  } else {
    playerIndicator.innerText = "Player 2";
    playerIndicator.className = "player2";
  }
}

//Reset the game
function resetHandler() {
  //Reset player
  player1Turn = true;
  //From resetGame.js
  resetGame();
  //Fixes bug with changing playerindicator through exported function
  resetTrigger = true;
}

// Highlighting columns
const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(item => {
  item.addEventListener("mouseenter", highlightColumn);
});

function highlightColumn(event) {
  const item = event.target;
  const column = item.dataset.column;
  const itemsInColumn = document.querySelectorAll(
    `div[data-column="${column}"]`
  );
  itemsInColumn.forEach(
    itemsInColumn => (itemsInColumn.style.background = "white")
  );
}

// Mouse leave event listener
gridItems.forEach(item => {
  item.addEventListener("mouseleave", unlightColumn);
});

function unlightColumn(event) {
  const item = event.target;
  const column = item.dataset.column;
  const itemsInColumn = document.querySelectorAll(
    `div[data-column="${column}"]`
  );
  itemsInColumn.forEach(
    itemsInColumn => (itemsInColumn.style.background = "dodgerblue")
  );
}

export { runTurn };
