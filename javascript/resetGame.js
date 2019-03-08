import {
  board,
  audio,
  background,
  button,
  turnIndicator,
  roundNumber
} from "./constants.js";
import { runTurn } from "./main.js";

function resetGame() {
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
  //Reset the board's html
  board.innerHTML = boardHtml;
  //Reset the victory art, music, and hide button
  audio.src = "";
  background.className = "";
  button.className = "hidden";
  //Reset players and board state
  turnIndicator.innerHTML = `<span class="player1" id="player-indicator">Player 1</span> turn`;
  document
    .querySelectorAll("input")
    .forEach(input => input.addEventListener("change", runTurn));

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

  return true;
}

export { resetGame };
