import Sprite from "../GameObjects/Sprite";
import Text from "../GameObjects/Text";
import Spine from "../GameObjects/Spine";
import ITweenJs, { TweenObject } from "../../Plugin/ITweenJs";
import Character from "../GameObjects/Character";

class EntityFactory {
    private _sprite : Sprite;
    private _spine : Spine;
    private _text : Text;
    private _tweenJS : ITweenJs;
    private _character: Character;

    constructor(sprite : Sprite, spine : Spine, text : Text, tweenJS : ITweenJs, character: Character) {
        this._sprite = sprite;
        this._spine = spine;
        this._text = text;
        this._tweenJS = tweenJS;
        this._character = character;
    }

    sprite(x : number, y : number, sheet : string, frame ?: string) : Sprite {
        let spr = this._sprite.createNew();
        spr.init(x, y, sheet, frame);

        return spr;
    }

    spine(x : number, y : number, name : string) : Spine {
        let spn = this._spine.createNew();
        spn.init(x, y, name);

        return spn;
    }

    text(x : number, y : number, text : string, style : any) {
        let txt = this._text.createNew();
        txt.init(x, y, text, style);

        return txt;
    }

    tween(object : any, to : any, time : number, onDone : Function, easing ?: string) : TweenObject {
        return this._tweenJS.createTween(object, to, time, onDone, easing);
    }

    character(x: number, y: number, animationSheets: string[]) {
        let char = this._character.createNew();
        char.init(x, y, animationSheets);

        return char;
    }
}

export default EntityFactory;