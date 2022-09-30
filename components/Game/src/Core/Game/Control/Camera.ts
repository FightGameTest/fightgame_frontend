class Camera {
    private _x : number;
    private _y : number;

    private _onUpdate : Function;
    private _minDiffX: number;
    private _minDiffY: number;

    private _maxX: number;
    private _minX: number;

    private _maxY: number;
    private _minY: number;

    constructor() {
        this._onUpdate = () => { };
        this._x = 0;
        this._y = 0;

        this._maxX = 2000;
        this._minX = -2000;
        this._maxY = 3000;
        this._minY = -3000;


        this._minDiffX = 0.5;
        this._minDiffY = 0.5;
    }

    get x() : number {
        return this._x;
    }

    get y() : number {
        return this._y;
    }

    get onUpdate() : Function {
        return this._onUpdate;
    }

    set x(val : number) {
        if (this._getPositive(val - this._x) > this._minDiffX) {
            //this._updateXY(val, this._y);
            
            if (val < this._maxX && val > this._minX) this._updateXY(val, this._y);
        }
    }

    set y(val : number) {
        if (this._getPositive(val - this._y) > this._minDiffY) {
            //this._updateXY(this._x, val);
            if (val < this._maxY && val > this._minY) this._updateXY(this._x, val);
        }
    }

    set onUpdate(val : Function) {
        this._onUpdate = val;
    }

    public int(x : number, y : number, onUpdate : Function) {
        this._x = x;
        this._y = y;
        this._onUpdate = onUpdate;
    }

    private _updateXY(x: number, y: number) {

        if (x != this._x) this._x = x;
        if (y != this._y) {
            //console.log("Updaing y")
            this._y = y;
        }

        this._onUpdate();
    }

    private _getPositive(val: number) {
        if (val < 0) return val * -1;

        return val;
    }
}

export default Camera;