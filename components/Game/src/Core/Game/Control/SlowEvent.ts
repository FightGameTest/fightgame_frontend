class SlowEvent {
    private _skipUpdates : number;
    private _updates : number;

    constructor() {
        this._skipUpdates = 0;
        this._updates = 0;
    }

    public init(skipUpdates : number) {
        this._skipUpdates = skipUpdates;
    }

    public canExecute() {
        this._updates++;

        if (this._updates >= this._skipUpdates) {
            this._updates = 0;
            return true;
        } else {
            return false;
        }
    }
}

export default SlowEvent;