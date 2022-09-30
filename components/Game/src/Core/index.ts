import ControlContainer from "../Dep/ControlContainer";
import NoireLibre from "./NoireLibre";

let cc = new ControlContainer();
let noireLibre = <NoireLibre>cc.getMain();

noireLibre.startGame();

console.log("Welcome to NoireLibre!");