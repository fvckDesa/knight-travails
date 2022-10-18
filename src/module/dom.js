import knightMoves from "./knightMoves";
import { wait } from "./utils";

const BOARD_LENGTH = 8;

// Dom selector as jquery
export function $(selector, getAll = false, parent = document) {
  return getAll
    ? parent.querySelectorAll(selector)
    : parent.querySelector(selector);
}

function clearBoard(boardEl) {
  for (const cell of boardEl.children) {
    cell.innerHTML = "";
  }
}

export function createBoard(boardEl, knight) {
  let isMoving = false;
  // clear board
  boardEl.replaceChildren(knight);
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
        moveKnight(knight, col, row);
      });

      boardCell.addEventListener("click", async () => {
        if (isMoving) return;
        // active flags
        isMoving = true;
        knight.draggable = false;
        knight.classList.add("move");
        boardEl.classList.add("isMoving");

        clearBoard(boardEl);

        const knightX = parseFloat(knight.style.left) / 12.5;
        const knightY = parseFloat(knight.style.top) / 12.5;
        let pos = 0;

        const moves = knightMoves([knightX, knightY], [col, row]);

        for (const [x, y] of moves) {
          moveKnight(knight, x, y);
          await wait(550);
          if (pos < moves.length - 1) {
            $(`[data-coords="${x}-${y}"]`).innerHTML = `<span>${pos++}</span>`;
          }
        }
        // remove flags
        isMoving = false;
        knight.draggable = true;
        knight.classList.remove("move");
        boardEl.classList.remove("isMoving");
      });

      boardEl.appendChild(boardCell);
    }
  }
}

export function moveKnight(knight, x, y) {
  knight.style.left = `${x * 12.5}%`;
  knight.style.top = `${y * 12.5}%`;
}
