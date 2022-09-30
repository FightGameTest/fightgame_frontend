// Function Object
import IFunObj from "./IFunObj";

class FunObj implements IFunObj {
    private _f: Function;
    private _context: any;

    private _function: Function;

    constructor() {
        this._f = () => { };
        this._function = () => { };
    }

    get function(): any {
        return this._f;
    }

    get context(): any {
        return this._context;
    }

    init(f: Function, context: any) {
        this._f = f;
        this._context = context;
        this._function = f.bind(context);
    }

    execute(data: any): any {
        return this._function(data);
    }

    createNew(): FunObj {
        return new FunObj();
    }
}

export default FunObj;
