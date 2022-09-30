import IAbstractGameObject from "../../../Plugin/IAbstractGameObject";
import GameObject from "../../../Plugin/IAbstractGameObject";

class Input {
    private _onMouseUp : Function[];
    private _onKeyUp : { key : string, foo : Function }[];
    private _onKeyDown : { key : string, foo : Function }[];
    private _onKeyDownOnce : { key : string, foo : Function }[];
    private _onKeyUpTemp : { key : string, foo : Function }[];

    private _currentDown: any;

    private _foreignObject : IAbstractGameObject;

    private _abstractObject : IAbstractGameObject;

    constructor(foreignObject : IAbstractGameObject) {
        this._foreignObject = foreignObject;
        this._abstractObject = foreignObject;

        this._onMouseUp = [];

        this._onKeyDown = [];
        this._onKeyUp = [];
        this._onKeyDownOnce = [];
        this._onKeyUpTemp = [];

        this._currentDown = {};
    }

    public addMouseUp(foo : Function) {
        this._onMouseUp.push(foo);
    }

    public addKeyUp(key : string, foo : Function) {
        this._onKeyUp.push({ key: key, foo: foo });
    }

    public addKeyDown(key : string, foo : Function) {
        this._onKeyDown.push({ key: key, foo: foo });
    }

    public addKeyDownOnce(key : string, foo : Function) {
        this._onKeyDownOnce.push({ key: key, foo: foo });
    }

    public init(foreignObject : IAbstractGameObject) {
        this._foreignObject = foreignObject;

        this._foreignObject.interactive = true;

        this._addListeners(foreignObject);

    }

    public createNew() : Input {
        return new Input(this._abstractObject.createNew());
    }

    public destroy() {
        this._onMouseUp = [];

        this._onKeyUp = [];
        this._onKeyDownOnce = [];
        this._onKeyUpTemp = [];
        this._onKeyDown = [];
    }

    public isDown(code: string) {
        let downs: any[] = [];

        Object.keys(this._currentDown).forEach((key: any) => {
            //console.log("Calculating", key, this._currentDown[key])
            if (key == code && this._currentDown[key] == true) downs.push(key);
        })

        if (downs.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    private _addListeners(foreignObject : IAbstractGameObject) {
        this._addMouseListners(foreignObject);
        this._addKeyboardListners();
    }

    private _addMouseListners(foreignObject : IAbstractGameObject) {
        this._foreignObject.on('pointerup', () => {
            this._executeMouseUp();
        });
    }

    private _addKeyboardListners() {
        document.addEventListener('keydown', (e : { code : string }) => {
            this._executeKeyDown(e.code);
            this._executeKeyDownOnce(e.code);
            this._currentDown[e.code] = true;


        });


        document.addEventListener('keyup', (e : { code : string }) => {
            this._executeKeyUp(e.code);
            this._executekeyUpTemp(e.code);
            this._currentDown[e.code] = false;

            delete this._onMouseUp[0];
        });
    }

    private _executeKeyDown(key : string) {
        //console.log("keydown exec: ", key);

        this._executeKey(key, this._onKeyDown);
    }

    private _executeKeyUp(key : string) {
        this._executeKey(key, this._onKeyUp);
    }

    private _executeKeyDownOnce(key : string) {
        let result = this._executeKey(key, this._onKeyDownOnce, true);

        this._addArray(result, this._onKeyUpTemp);
    }

    private _executekeyUpTemp(key : string) {
        let result = this._executeKey(key, this._onKeyUpTemp, true, false);

        this._addArray(result, this._onKeyDownOnce);
    }

    private _addArray(source : any[], destination : any[]) {
        for (let c = 0; c < source.length; c++) {
            destination.push(source[c]);
        }
    }

    private _executeKey(key : string, ruleArray : { key : string, foo : Function }[], remove : boolean = false, canExec : boolean = true) {
        let arr: any[] = [];

        for (let c = ruleArray.length - 1; c >= 0; c--) {
            let execRule = ruleArray[c];
            if (execRule.key == key && canExec) execRule.foo();

            if (remove) {
                ruleArray.splice(c, 1);
                arr.push(execRule);
            }
        }

        return arr;
    }

    private _executeMouseUp() {
        for (let c = 0; c < this._onMouseUp.length; c++) {
            let foo = this._onMouseUp[c];
            foo();
        }
    }
}

export default Input;