import "./style.css";
import { $, createBoard, moveKnight } from "./module/dom";
import { random } from "./module/utils";

const knight = $(".knightChess");

createBoard($(".board"), knight);

// set knight in random position
moveKnight(knight, random(8), random(8));

knight.addEventListener("dragstart", (e) => {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "move";
});
