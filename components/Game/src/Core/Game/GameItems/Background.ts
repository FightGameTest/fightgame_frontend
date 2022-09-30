import Sprite from "../../Kernel/GameObjects/Sprite";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";
import { PositionMode, ContainerMode, Positions } from "../../Kernel/Data/ScaleMode";
import { SizeMode, Sizes } from "../../Kernel/Data/ScaleMode";


class Background {
    private _entityFactory : EntityFactory;
    private _sprite : Sprite;

    constructor(entityFactory : EntityFactory, sprite : Sprite) {
        this._entityFactory = entityFactory;
        this._sprite = sprite;
    }

    get sprite() : Sprite {
        return this._sprite;
    }

    public init(x : number, y : number, sheet: string, frame : string | undefined = undefined) {
        this._sprite = this._entityFactory.sprite(x, y, sheet, frame);

        this._sprite.position.anchorX = 0;
        this._sprite.position.anchorY = 0;

        this._sprite.position.disableCamera = true;

        this._sprite.position.fitInsideContainer(false);
        this._sprite.display.setScaleMode(Sizes.fill, Sizes.fill, 1);
    }

    public createNew() : Background {
        return new Background(this._entityFactory, this._sprite.createNew());
    }
}

export default Background;