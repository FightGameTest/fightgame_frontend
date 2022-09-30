import IAbstractGameObject from "../../../Plugin/IAbstractGameObject";
import Scale from "./Scale";
import { PositionMode, ContainerMode, Positions } from "../../Data/ScaleMode";
import IScreen from "../../../Plugin/IScreen";
import Camera from "../../../Game/Control/Camera";

class Position {
    private _scale : Scale;
    private _screen : IScreen;

    private _x : number;
    private _y : number;
    private _anchorX : number;
    private _anchorY : number;
    private _angle : number;
    private _scaleMode : PositionMode;
    private _containerMode : ContainerMode;

    private _foreignObject : IAbstractGameObject;
    private _abstractObject : IAbstractGameObject;
    private _camera : Camera;

    private _disableCamera: boolean;

    private _trackX: Function;
    private _trackY: Function;

    constructor(foreignObject : IAbstractGameObject, scale : Scale, camera : Camera, screen : IScreen) {
        this._foreignObject = foreignObject;
        this._abstractObject = foreignObject;
        this._scale = scale;
        this._camera = camera;
        this._screen = screen;

        this._x = 0;
        this._y = 0;
        this._angle = 0;
        this._anchorX = 0;
        this._anchorY = 0;
        this._scaleMode = { x: Positions.left, y: Positions.left, modifier: 1 };
        this._containerMode = ContainerMode.gameplay;

        this._trackX = () => {};
        this._trackY = () => {};

        this._disableCamera = false;

    }

    get disableCamera(): boolean {
        return this._disableCamera;
    }

    get scale() {
        return this._scale;
    }

    get camera() {
        return this._camera;
    }

    get x() : number {
        return this._x;
    }

    get y() : number {
        return this._y;
    }

    get angle() : number {
        return this._angle;
    }

    get anchorX() : number {
        return this._anchorX;
    }

    get anchorY() : number {
        return this._anchorY;
    }

    get mouseX() : number {
        return this._scale.convertPlaceX(this._screen.mouse.mouse.global.x);
    }

    get mouseY() : number {
        //console.log("Global Mouse Y: ", this._screen.mouse.mouse.global.y);
        return this._scale.convertPlaceY(this._screen.mouse.mouse.global.y);
    }

    set x(val : number) {
        this._x = val;
        this._updatePosition();
        this._trackX(this.x);
    }

    set y(val : number) {
        this._y = val;
        this._updatePosition();
        this._trackY(this.y);
    }

    set angle(val : number) {
        this._angle = val;
        this._updatePosition();
    }

    set anchorX(val : number) {
        this._anchorX = val;
        this._updatePosition();
    }

    set anchorY(val : number) {
        this._anchorY = val;
        this._updatePosition();
    }

    set trackX(val: Function) {
        this._trackX = val;
    }

    set trackY(val: Function) {
        this._trackY = val;
    }


    set disableCamera(val: boolean) {
        this._disableCamera = val;
    }

    public setScaleMode(x : Positions, y : Positions, modifier : number) {
        this._scaleMode.x = x;
        this._scaleMode.y = y;
        this._scaleMode.modifier = modifier;

        this._updatePosition();
    }

    public fitInsideContainer(val : boolean) {
        if (val) {
            this._containerMode = ContainerMode.gameplay;
        } else {
            this._containerMode = ContainerMode.global;
        }

        this._updatePosition();
    }

    public init(x : number, y : number, foreignObject : IAbstractGameObject) {
        this._foreignObject = foreignObject;

        this.x = x;
        this.y = y;
    }

    public createNew() : Position {
        return new Position(this._abstractObject.createNew(), this._scale.createNew(), this._camera, this._screen);
    }

    public updatePosition() {
        this._updatePosition();
    }

    private _updatePosition() {
        this._scale.mode.positionMode = this._scaleMode;
        this._scale.mode.containerMode = this._containerMode;

        if (!this._disableCamera) {
            this._foreignObject.x = this._scale.placeX(this._camera.x + this._x);
            this._foreignObject.y = this._scale.placeY(this._camera.y + this._y);
        } else {
            this._foreignObject.x = this._scale.placeX(this._x);
            this._foreignObject.y = this._scale.placeY(this._y);

            //console.log(`Targeting ${this._foreignObject.x} and ${this._foreignObject.y}`);
        }

        



        this._foreignObject.angle = this._angle;
        this._foreignObject.anchor.set(this._anchorX, this._anchorY);
    }

}

export default Position;