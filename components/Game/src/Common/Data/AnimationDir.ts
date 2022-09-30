export enum AnimationSide {
    Negative = 0,
    Positive = 1,
    Same = 2
}

export function CalculateDirection(current: number, last: number) {
    if (current - last > 0) {
        return AnimationSide.Positive;
    } else if (current == last) {
        return AnimationSide.Same;
    } else {
        return AnimationSide.Negative;
    }
}

export type MaxMin = {max: number, min: number, label: string, animation: string, sideX: AnimationSide, sideY: AnimationSide};
type AnimEntry = {label: string, key: string, sideX: AnimationSide, sideY: AnimationSide};

class AnimationDir {

    private _dir: MaxMin[];
    private _labels: string[];

    get dir() {
        return this._dir;
    }

    constructor() {
        this._dir = [
            {max: 145, min: 211, label: "LEFT", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 344, min: 360, label: "RIGHT", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 250, min: 285, label: "UP", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 64, min: 109, label: "DOWN", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 211, min: 250, label: "LEFTUP", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 109, min: 145, label: "LEFTDOWN", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 285, min: 344, label: "RIGHTUP", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 16, min: 64, label: "RIGHTDOWN", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: 0, min: 16, label: "RIGHT", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive},
            {max: -1, min: -1, label: "IDLE", animation: "", sideX: AnimationSide.Positive, sideY: AnimationSide.Positive}
        ]

        this._labels = ["LEFT", "RIGHT", "UP", "DOWN", "LEFTUP", "LEFTDOWN", "RIGHTUP", "RIGHTDOWN", "IDLE"];
    }

    public setAnimations(anims: AnimEntry[]) {
        anims.forEach((value: AnimEntry) => {
            let label = value.label;

            if (this._labels.includes(label)) {
                this._setAnimation(value.label, value.key, value.sideX, value.sideY);

            }
        });
    }


    public animForAngle(angle: number) {
        let res = this._dir.filter(data => ((angle > data.max && angle <= data.min) && data.max >= 0));

        if (res.length < 1) console.error("Can't calculate anim for angle!");

        return res[0];
    }

    public animForLabel(label: string) {
        let res = this._dir.filter(data => (data.label == label));

        if (res.length < 1) console.error("Can't calculate anim for label!");

        return res[0];
    }

    public animForKey(key: string) {
        let res = this._dir.filter(data => (data.animation == key));

        console.log(`Key: ${key}`);

        if (res.length < 1) console.error("Can't calculate anim for animation key!");

        return res[0];
    }

    public createNew(): AnimationDir {
        return new AnimationDir();
    }


    private _setAnimation(label: string, animation: string, sideX: AnimationSide = AnimationSide.Positive, sideY: AnimationSide = AnimationSide.Positive) {
        this._dir.forEach(element => {
            if (element.label == label) {
                element.animation = animation;
                element.sideX = sideX;
                element.sideY = sideY;
            }
        })
    }
}

export default AnimationDir;