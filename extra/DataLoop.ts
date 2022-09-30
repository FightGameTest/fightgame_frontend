type FunBox = {function: Function};

class DataLoop {
    private _data: any;

    constructor() {
        this._data = null;
    }

    private _checkDiff() {
        if (typeof window !== 'undefined') {
            if (this._data != null) {
                if ((window as any).fightgame != null) {
                    if ((window as any).fightgame[this._data.base] != null) {
                        if ((window as any).fightgame[this._data.base][this._data.data]) {
                            let newData = (window as any).fightgame[this._data.base][this._data.data];

                            if (this._data.value != newData) {
                                
                            }
                        }
                    }
                }
            }
        }
    }

    public start(data: any) {
        this._data = data;

        
    }
}

export default DataLoop;