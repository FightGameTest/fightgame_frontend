import CoreEntity from './CoreEntity';

import Position from './Component/Position';
import Display from './Component/Display';
import IAbstractGameObject from '../../Plugin/IAbstractGameObject';
import IScreen from "../../Plugin/IScreen";
import ISceneManager from "../../Plugin/ISceneManager";
import Input from './Component/Input';
import ScaleManager from '../Control/ScaleManager';

class Spine extends CoreEntity {
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

    public init(x : number, y : number, name : string) {
        let fo = this._screen.createSpine(name);

        fo.parentObject = this;

        console.log("Foreign Object: ", fo);

        this._sceneManager.addObject(fo);
        this._activate(x, y, fo);


        (<any>window).fobject = fo;

        this._scaleManager.addEntity(this);
    }

    public hasAnimation(animName : string) : boolean {
        return (<any>this._foreignObject).state.hasAnimation(animName);
    }

    public getCurrentAnimation() : string | null {
        let current = (<any>this._foreignObject).state.getCurrent(0);

        if (current != null) {
            return current.animation.name;
        } else {
            return null;
        }
    }

    public setAnimation(animName : string, repeat : boolean) {
        (<any>this._foreignObject).state.setAnimation(0, animName, repeat);
    }

    public setTimeScale(tScale : number) {
        (<any>this._foreignObject).state.timeScale = tScale;
    }

    public createNew() : Spine {
        let pos = this._position.createNew();
        let dis = this._display.createNew();
        let inp = this._input.createNew();
        let fo = this._abstractObject.createNew();

        return new Spine(pos, dis, inp, this._scaleManager, fo, this._screen, this._sceneManager);
    }
}

export default Spine;