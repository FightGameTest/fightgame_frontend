import {AnimationSide, CalculateDirection} from "../Data/AnimationDir";

type Record= {data: any, time: number};

class TimedStorage {
    private _records: Record[];
    private _deleteAfter: number;

    get deleteAfter(): number {
        return this._deleteAfter;
    }

    get direction(): AnimationSide {
        if (this._records.length < 2) {
            return AnimationSide.Same;
        } else {
            let current = this._records[this._records.length - 1];
            let last = this._records[this._records.length - 1];

            if (current.time - last.time > 250) {
                return AnimationSide.Same;
            } else {
                return CalculateDirection(current.data, last.data);
            }
        }
    }

    set deleteAfter(val: number) {
        this._deleteAfter = val;
    }

    constructor() {
        this._records = [];
        this._deleteAfter = 1000;
    }

    public addData(data: any) {
        this._records.push({data: data, time: Date.now()});
        this._removeDeadWeight();
    }

    public createNew(): TimedStorage {
        return new TimedStorage();
    }

    public indexOf(data: any): number {
        let index: number = -1;

        this._records.forEach((record: Record, i: number) => {
            if (record.data == data) index = i;
        });

        return index;
    }

    public contains(data: any): boolean {
        let index = this.indexOf(data);

        if (index > -1) {
            return true;
        } else {
            return false;
        }
    }


    private _removeDeadWeight() {
        if (this._records.length > 2) {
            let first = this._records[0];
            let last = this._records[this._records.length - 1];

            if (last.time - first.time > this._deleteAfter) this._records.shift();
        }
    }
}

export default TimedStorage;