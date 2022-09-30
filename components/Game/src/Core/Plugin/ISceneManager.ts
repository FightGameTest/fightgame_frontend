import IScene from "../Kernel/GameObjects/IScene";
import IAbstractGameObject from "./IAbstractGameObject";

interface ISceneManager {
    init() : void;
    addScene(name : string, scene : IScene) : void;
    startScene(name : string) : void;
    addObject(obj : IAbstractGameObject) : void;
    removeObject(obj : IAbstractGameObject) : void;
}

export default ISceneManager;