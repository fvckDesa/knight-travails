import { $, wait } from "../utils";
import { BOARD_LENGTH, dropSound, slideSound } from "../constants";

function clearBoard(boardEl) {
  for (const cell of boardEl.children) {
    cell.innerHTML = "";
  }
  // remove all arrows
  $(".arrowContainer", true, boardEl).forEach((arrow) => arrow.remove());
}

function createArrow(boardEl, fromCoords, toCoords) {
  // px length of board cell
  const cellLength = boardEl.getBoundingClientRect().width / BOARD_LENGTH;
  // transform coords in px
  const from = fromCoords.map((coord) => coord * cellLength + cellLength / 2);
  const to = toCoords.map((coord) => coord * cellLength + cellLength / 2);
  // calc cathects and hypotenuse
  const c1 = to[0] - from[0];
  const c2 = from[1] - to[1];
  const i = Math.sqrt(c1 ** 2 + c2 ** 2);
  // calc deg of arrow with arctan and get correct rotation with -1 multiplication
  const angleDeg = ((Math.atan2(c2, c1) * 180) / Math.PI) * -1;
  // create arrow element and append in board
  const arrowContainer = document.createElement("div");
  arrowContainer.className = "arrowContainer";
  arrowContainer.style.cssText = `
    top: ${from[1]}px;
    left: ${from[0]}px;
    width: ${i}px;
    rotate: ${angleDeg}deg;
  `;

  const arrow = document.createElement("div");
  arrow.className = "arrow";

  arrowContainer.appendChild(arrow);

  boardEl.appendChild(arrowContainer);
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
          if (pos > 0) createArrow(boardEl, knight.coords, [x, y]);
          knight.move(x, y);
          await wait(750);
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
