import IAbstractGameObject from "../../../Plugin/IAbstractGameObject";

class Body {
    private _x1 : number;
    private _y1 : number;
    private _x2 : number;
    private _y2 : number;
    private _vx : number;
    private _vy : number;
    private _canCollide : boolean;

    private _foreignObject : IAbstractGameObject;
    private _abstractObject : IAbstractGameObject;

    public data: any | null;

    constructor(foreignObject : IAbstractGameObject) {
        this._x1 = 0;
        this._y1 = 0;
        this._x2 = 0;
        this._y2 = 0;
        this._vx = 0;
        this._vy = 0;

        this._canCollide = true;

        this._foreignObject = foreignObject;
        this._abstractObject = foreignObject;

        this.data = null;
    }

    get canCollide() : boolean {
        return this._canCollide;
    }

    get x1() : number {
        return this._x1;
    }

    get x2() : number {
        return this._x2;
    }

    get y1() : number {
        return this._y1;
    }

    get y2() : number {
        return this._y2;
    }

    get vx() : number {
        return this._vx;
    }

    get vy() : number {
        return this._vy;
    }

    set x1(val : number) {
        this._x1 = val;
    }

    set x2(val : number) {
        this._x2 = val;
    }

    set y1(val : number) {
        this._y1 = val;
    }

    set y2(val : number) {
        this._y2 = val;
    }

    set vx(val : number) {
        this._vx = val;
    }

    set vy(val : number) {
        this._vy = val;
    }

    set canCollide(val : boolean) {
        this._canCollide = val;
    }


    public init(foreignObject : IAbstractGameObject) {
        this._foreignObject = foreignObject;
    }

    public createNew() : Body {
        return new Body(this._abstractObject.createNew());
    }
}

export default Body;