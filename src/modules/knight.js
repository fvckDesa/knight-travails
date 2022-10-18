import knightMoves from "../utils/knightMoves";
import { CELL_PERCENTAGE } from "../constants";

export default function Knight(knight) {
  let knightX, knightY;

  return {
    move(x, y) {
      knight.style.left = `${x * CELL_PERCENTAGE}%`;
      knight.style.top = `${y * CELL_PERCENTAGE}%`;
      knightX = x;
      knightY = y;
    },
    steps(end) {
      return knightMoves([knightX, knightY], end);
    },
    get element() {
      return knight;
    },
  };
}
