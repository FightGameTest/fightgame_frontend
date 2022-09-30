type FunBox = {function: Function, context: any, executable: Function};
type HookEntry = {name: string, fun: FunBox[]};

class ReactBridge {
    private _entries: {bridge: HookEntry[]};

    constructor() {
        this._entries = {bridge:[]};
    }

    public forceAvailableGlobal() {
        this._entries = (this as any).globalState;
    }

    public changeGlobal(globalState: any) {
        this._entries = globalState;
    }

    public execute(name: string, data: any) {
        let elm = this._getElement(name);

        if (elm) {
            elm.fun.forEach((fBox: FunBox, index: number) => {
                if (data != null) {
                    fBox.executable(data);
                } else {
                    fBox.executable();
                }
            })
        } else {
            //console.error(`No entry found for "${name}"`);
        }
    }

    public getValue(name: string, data: any): any | null {
        let elm = this._getElement(name);
        let ret: any;

        if (elm) {
            elm.fun.forEach((fBox: FunBox, index: number) => {
                if (data != null) {
                    ret= fBox.executable(data);
                } else {
                    ret = fBox.executable();
                }
            })

            return ret;
        } else {
            //console.error(`No entry found for "${name}"`);
            return null;
        }
    }

    public addEntry(name: string, fun: Function, context: any, forceSingle: boolean = false) {
        let elmFun = {function: fun, context: context, executable: this._bindFunction(fun, context)};
        let elm = {name: name, fun: [elmFun]};

        let entry = this._getElement(name);

        if (entry) {
            
            if (forceSingle) {
                entry.fun = [];
            }

            entry.fun.push(elmFun);
            // console.log(`Entry found for "${name}"`);
            // console.log(entry.fun);

        } else {
            // console.log(`Entry not found for "${name}"`);
            this._entries.bridge.push(elm);
        }
    }

    public removeEntry(name: string, fun: Function, context: any) {
        let elm = this._getElement(name);

        if (elm != null) {
            let targetIndex = -1;

            elm.fun.forEach((fBox: FunBox, index: number) => {
                if (fBox.function == fun) targetIndex = index;
            });

            if (targetIndex > -1) elm.fun.splice(targetIndex, 1);
        }
    }

    private _getElement(name: string) {
        let index = this._findEntry(name);

        if (index > -1) {
            return this._entries.bridge[index];
        } else {
            return null;
        }
    }

    private _findEntry(name: string) {
        let index = -1;

        //console.log(this._entries);

        this._entries.bridge.forEach((entry: HookEntry, count: number) => {
            if (entry.name == name) index = count;
        })

        return index;
    }

    private _bindFunction(fun: Function, context: any) {
        if (context != null) {
            return fun.bind(context);
        } else {
            return fun;
        }
    }

}

export default ReactBridge;