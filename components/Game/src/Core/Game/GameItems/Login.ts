import Button from './Button';

import Sprite from "../../Kernel/GameObjects/Sprite";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";

import { PositionMode, ContainerMode, Positions } from "../../Kernel/Data/ScaleMode";
import { SizeMode, Sizes } from "../../Kernel/Data/ScaleMode";


class Login extends Button {
    constructor(entityFactory : EntityFactory, sprite : Sprite) {
        super(entityFactory, sprite);
    }

    public set(x: number, y: number, foo: Function = () => {console.log("Discord <login request>")}, sheet: string = 'login', frame: string | undefined = undefined) {
        this.initStatic(x, y, () => {
            foo();
        }, sheet, frame);

        this.sprite.position.disableCamera = true;

        //this.sprite.position.fitInsideContainer(false);
        //this.sprite.display.setScaleMode(Sizes.fill, Sizes.fill, 1);
    }
}

export default Login;