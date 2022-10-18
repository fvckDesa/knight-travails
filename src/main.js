import "./style.css";
import { Knight, createBoard } from "./modules";
import { $, random } from "./utils";

const knight = Knight($(".knightChess"));

createBoard($(".board"), knight);

// set knight in random position
knight.move(random(8), random(8));

knight.element.addEventListener("dragstart", (e) => {
  e.dataTransfer.effectAllowed = "move";
});
