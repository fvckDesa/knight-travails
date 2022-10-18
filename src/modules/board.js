import { $, wait } from "../utils";
import { BOARD_LENGTH, dropSound, slideSound } from "../constants";

function clearBoard(boardEl) {
  for (const cell of boardEl.children) {
    cell.innerHTML = "";
  }
}

export function createBoard(boardEl, knight) {
  let isMoving = false;
  // clear board
  boardEl.replaceChildren(knight.element);
  // create new board
  for (let row = 0; row < BOARD_LENGTH; row++) {
    for (let col = 0; col < BOARD_LENGTH; col++) {
      // create cell
      const boardCell = document.createElement("div");
      boardCell.dataset.coords = `${col}-${row}`;
      boardCell.classList.add("cell");
      // cell color
      if (row % 2 === 0)
        boardCell.classList.add(col % 2 === 0 ? "light" : "dark");
      else boardCell.classList.add(col % 2 === 1 ? "light" : "dark");
      // cell events
      boardCell.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      boardCell.addEventListener("drop", (e) => {
        e.preventDefault();
        clearBoard(boardEl);
        dropSound.play();
        knight.move(col, row);
      });

      boardCell.addEventListener("click", async () => {
        if (isMoving) return;
        // active flags
        isMoving = true;
        knight.element.draggable = false;
        knight.element.classList.add("move");
        boardEl.classList.add("isMoving");

        clearBoard(boardEl);

        let pos = 0;

        const moves = knight.steps([col, row]);

        for (const [x, y] of moves) {
          knight.move(x, y);
          await wait(700);
          if (pos < moves.length - 1) {
            slideSound.play();
            $(`[data-coords="${x}-${y}"]`).innerHTML = `<span>${pos++}</span>`;
          }
        }
        // remove flags
        isMoving = false;
        knight.element.draggable = true;
        knight.element.classList.remove("move");
        boardEl.classList.remove("isMoving");
      });

      boardEl.appendChild(boardCell);
    }
  }
}
