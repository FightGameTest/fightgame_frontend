import IAbstractGameObject from "../../Plugin/IAbstractGameObject";

import Position from './Component/Position';
import Display from './Component/Display';
import Input from './Component/Input';
import ScaleManager from '../Control/ScaleManager';
import IScreen from "../../Plugin/IScreen";

class CoreEntity {
    protected _position : Position;
    protected _display : Display;
    protected _input : Input;
    protected _foreignObject : IAbstractGameObject;
    protected _scaleManager : ScaleManager;

    private _information : any;

    protected _screen: IScreen;
    private _graphics: any | null;

    protected _timeSlotA : number;
    protected _timeSlotB : number;
    protected _timeSlotC : number;
    protected _timeSlotD : number;
    protected _timeSlotE : number;
    protected _defaultTime : number;

    protected _id;

    protected _body: any;

    constructor(screen: IScreen, position : Position, display : Display, input : Input,
        foreignObject : IAbstractGameObject,
        scaleManager : ScaleManager) {
        this._screen = screen;
        this._position = position;
        this._display = display;
        this._input = input;
        this._foreignObject = foreignObject;
        this._scaleManager = scaleManager;

        this._defaultTime = -1;

        this._timeSlotA = this._defaultTime;
        this._timeSlotB = this._defaultTime;
        this._timeSlotC = this._defaultTime;
        this._timeSlotD = this._defaultTime;
        this._timeSlotE = this._defaultTime;

        this._graphics = null;

        this._id = 0;

        this._body = null;
    }

    get id() : number {
        return this._id;
    }

    get timeSlotA() : number {
        return this._timeSlotA;
    }

    get timeSlotB() : number {
        return this._timeSlotB;
    }

    get timeSlotC() : number {
        return this._timeSlotC;
    }

    get timeSlotD() : number {
        return this._timeSlotD;
    }

    get timeSlotE() : number {
        return this._timeSlotE;
    }

    get defaultTime() : number {
        return this._defaultTime;
    }

    //Attach extra information
    get information() : any {
        return this._information;
    }

    get position() : Position {
        return this._position;
    }

    get display() : Display {
        return this._display;
    }

    get input() : Input {
        return this._input;
    }

    get body() : any {
        return this._body;
    }

    get foreignObject() : IAbstractGameObject {
        return this._foreignObject;
    }

    set information(val : any) {
        this._information = val;
    }

    set body(val: any) {
        this._body = val;
    }


    set timeSlotA(val : number) {
        this._timeSlotA = val;
    }

    set timeSlotB(val : number) {
        this._timeSlotB = val;
    }

    set timeSlotC(val : number) {
        this._timeSlotC = val;
    }

    set timeSlotD(val : number) {
        this._timeSlotD = val;
    }

    set timeSlotE(val : number) {
        this._timeSlotE = val;
    }

    set id(val : number) {
        this._id = val;
    }

    public enableInput() {
        this._input.init(this._foreignObject);
    }

    public destroy() {
        this._display.destroy();
        this._input.destroy();
    }
    //x: number, y: number, width: number, height: number
    public drawDebug() {
        if (this._graphics == null) {
            this._graphics = this._screen.createGraphics();
            (<any>this).addObject(this._graphics);
        }

        let x = this.position.scale.placeX(this.body.position.x + this.position.camera.x) - (this.display.width);
        let y = this.position.scale.placeY(this.body.position.y + this.position.camera.y) - (this.display.height);

        this._screen.drawRect(this._graphics, x, y, this.display.width, this.display.height, null);
    }

    protected _activate(x : number, y : number, foreignObject : IAbstractGameObject) {
        this._position.init(x, y, foreignObject);
        this._display.init(foreignObject);

        this._foreignObject = foreignObject;
    }
}

export default CoreEntity; 