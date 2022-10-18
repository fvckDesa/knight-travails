import DropSound from "../assets/drop.wav";
import SlideSound from "../assets/slide.mp3";

export const dropSound = new Audio(DropSound);
export const slideSound = new Audio(SlideSound);

export const BOARD_LENGTH = 8;
export const CELL_PERCENTAGE = 100 / BOARD_LENGTH;
