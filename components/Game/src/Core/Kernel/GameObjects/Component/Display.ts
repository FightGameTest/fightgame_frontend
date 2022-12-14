import IAbstractGameObject from "../../../Plugin/IAbstractGameObject";
import IScreen from "../../../Plugin/IScreen";
import GameObject from "../../../Plugin/IAbstractGameObject";
import { SizeMode, ContainerMode, Sizes } from "../../Data/ScaleMode";
import Scale from './Scale';

class Display {
    private _alpha : number;
    private _visible : boolean;
    private _scaleX : number;
    private _scaleY : number;

    private _foreignObject : IAbstractGameObject;
    private _abstractObject : IAbstractGameObject;
    private _scale : Scale;
    private _screen : IScreen;

    private _scaleMode : SizeMode;
    private _containerMode : ContainerMode;

    constructor(foreignObject : IAbstractGameObject, scale : Scale, screen : IScreen) {
        this._foreignObject = foreignObject;
        this._abstractObject = foreignObject;
        this._scale = scale;
        this._screen = screen;

        this._alpha = 1;
        this._visible = true;
        this._scaleX = 1;
        this._scaleY = 1;
        this._scaleMode = { x: Sizes.normal, y: Sizes.normal, modifier: 1 };
        this._containerMode = ContainerMode.gameplay;
    }

    get tint() : number {
        return this._foreignObject.tint;
    }

    get alpha() : number {
        return this._alpha;
    }

    get visible() : boolean {
        return this._visible;
    }

    get width() : number {
        return this._sendPositive(this._scale.reverseScale(this._foreignObject.width));
    }

    get height() : number {
        return this._sendPositive(this._scale.reverseScale(this._foreignObject.height));
    }

    get inGameWidth(): number {
        return this._foreignObject.width;
    }

    get inGameHeight(): number {
        return this._foreignObject.height;
    }

    get scaleX() : number {
        return this._scaleX;
    }

    get scaleY() : number {
        return this._scaleY;
    }

    set alpha(val : number) {
        this._alpha = val;
        this._updateDisplay();
    }

    set visible(val : boolean) {
        this._visible = val;
        this._updateDisplay();
    }

    set scaleX(val : number) {
        this._scaleX = val;
        this._updateScale();
    }

    set scaleY(val : number) {
        this._scaleY = val;
        this._updateScale();
    }

    set tint(val : number) {
        this._foreignObject.tint = val;
    }

    public setScaleMode(x : Sizes, y : Sizes, modifier : number) {
        this._scaleMode.x = x;
        this._scaleMode.y = y;
        this._scaleMode.modifier = modifier;

        this._updateScale();
    }


    public fitInsideContainer(val : boolean) {
        if (val) {
            this._containerMode = ContainerMode.gameplay;
        } else {
            this._containerMode = ContainerMode.global;
        }

        this._updateScale();
    }

    public destroy() {
        this._foreignObject.destroy();
    }

    public updateTexture(sheet : string, frame ?: string) {
        this._screen.updateTexture(this._foreignObject, sheet, frame);
    }

    public init(foreignObject : IAbstractGameObject) {
        this._foreignObject = foreignObject;

        this.alpha = 1;
        this.visible = true;

        this._scale.init(this._foreignObject);

        this._updateScale();
    }

    public createNew() : Display {
        return new Display(this._abstractObject.createNew(), this._scale.createNew(), this._screen);
    }

    public updateScale() {
        this._updateScale();
    }

    private _updateScale() {
        this._scale.mode.sizeMode = this._scaleMode;
        this._scale.mode.containerMode = this._containerMode;
        this._scale.x = this._scaleX;
        this._scale.y = this._scaleY;

        this._updateDisplay();
    }

    private _sendPositive(val: number) {
        if (val < 0) {
            return val * -1;
        } else {
            return val;
        }
    }

    private _updateDisplay() {
        this._foreignObject.alpha = this._alpha;
        this._foreignObject.visible = this._visible;
        this._foreignObject.scale.x = this._scale.resizeX(this._scaleX);
        this._foreignObject.scale.y = this._scale.resizeY(this._scaleY);
    }
}

export default Display;