import Sprite from "../../Kernel/GameObjects/Sprite";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";

class Button {
    private _entityFactory : EntityFactory;
    private _sprite : Sprite;

    constructor(entityFactory : EntityFactory, sprite : Sprite) {
        this._entityFactory = entityFactory;
        this._sprite = sprite;
    }

    get sprite() : Sprite {
        return this._sprite;
    }

    public init(x : number, y : number, onButtonUp : Function, sheet: string, frame : string | undefined = undefined) {
        this._sprite = this._entityFactory.sprite(x, y, sheet, frame);
        this._sprite.enableInput();
        this._sprite.input.addMouseUp(() => {
            onButtonUp();
        })
    }

    public initStatic(x: number, y: number, onButtonUp: Function, sheet: string, frame: string | undefined = undefined) {
        this._sprite = this._entityFactory.sprite(x, y, sheet, frame);
        this._sprite.position.anchorX = 0.5;
        this._sprite.position.anchorY = 0.5;

        this._sprite.enableInput();
        this._sprite.input.addMouseUp(() => {
            onButtonUp();

        })
    }

    public createNew() : Button {
        return new Button(this._entityFactory, this._sprite.createNew());
    }
}

export default Button;