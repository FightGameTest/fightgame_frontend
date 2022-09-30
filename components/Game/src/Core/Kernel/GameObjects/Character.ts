import CoreEntity from './CoreEntity';

import Position from './Component/Position';
import Display from './Component/Display';
import IAbstractGameObject from '../../Plugin/IAbstractGameObject';
import IScreen from "../../Plugin/IScreen";
import ISceneManager from "../../Plugin/ISceneManager";
import Input from './Component/Input';
import ScaleManager from '../Control/ScaleManager';


class Character extends CoreEntity {
    protected _screen : IScreen;
    private _sceneManager : ISceneManager;
    private _abstractObject : IAbstractGameObject;

    constructor(position : Position, display : Display, input : Input,
        scaleManager : ScaleManager, foreignObject : IAbstractGameObject,
        screen : IScreen, sceneManager : ISceneManager) {
        super(screen, position, display, input, foreignObject, scaleManager);

        this._abstractObject = foreignObject;
        this._screen = screen;
        this._sceneManager = sceneManager;
    }


    public addObject(obj: any) {
        this._sceneManager.addObject(obj);
    }

    public init(x : number, y : number, animationSheets: string[]) {
        let fo = this._screen.createCustomSprite(animationSheets);

        fo.parentObject = this;

        this._sceneManager.addObject(fo);
        this._activate(x, y, fo);


        (<any>window).fobject = fo;

        this._scaleManager.addEntity(this);
    }

    public setAnimation(name: string, speed: number = 1, speeds: any = null) {
        this._foreignObject.setAnimation(name, speed, speeds);
    }

    public createNew() : Character {
        let pos = this._position.createNew();
        let dis = this._display.createNew();
        let inp = this._input.createNew();
        let fo = this._abstractObject.createNew();

        return new Character(pos, dis, inp, this._scaleManager, fo, this._screen, this._sceneManager);
    }
}

export default Character;
