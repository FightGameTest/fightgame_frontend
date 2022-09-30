import Sprite from "../../Kernel/GameObjects/Sprite";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";
import NewPhysics from "../../../Common/Brain/NewPhysics";

class MapBuilder {
    private _entityFactory : EntityFactory;
    private _spriteList : Sprite[];
    private _newPhysics: NewPhysics | null;

    private _newPhysicsStarted: boolean;

    constructor(entityFactory : EntityFactory) {
        this._entityFactory = entityFactory;
        this._spriteList = [];


        (<any>window).spriteList = this._spriteList;

        this._newPhysics = null;

        this._newPhysicsStarted = false;
    }

    get spriteList() : Sprite[] {
        return this._spriteList;
    }

    public init(np: NewPhysics) {
        this._newPhysics = np;
    }

    public addObjects(sImages : {
        imageName : string,
        x : number,
        y : number
    }[], sheet : string) {
        for (let c = 0; c < sImages.length; c++) {
            let elm = sImages[c];

            let spr = this._entityFactory.sprite(elm.x, 4000 - elm.y, sheet, elm.imageName);
            spr.position.anchorX = 0.5;
            spr.position.anchorY = 0.5;

            spr.position.y = spr.position.y - (spr.display.height / 2)
            spr.position.x = spr.position.x + (spr.display.width / 2);

            this._spriteList.push(spr);
        }
    }

    public showDebug() {
        this._spriteList.forEach((value: Sprite) => {
            value.drawDebug();
        })
    }

    public updatePositions() {
        for (let c = 0; c < this._spriteList.length; c++) {
            let spr = this._spriteList[c];
            spr.position.updatePosition();

            if (!this._newPhysicsStarted) {
                if (this._newPhysics) {
                    this._newPhysics.addObject(spr);
                    this._newPhysics.setStatic(spr, true);
                    this._newPhysics.setCategory(spr, 1);
                   // this._newPhysics.setMask(spr, 2);
                   // this._newPhysics.setMask(spr, 2);

                    console.log(spr.display.height);
                }
            }
        }

        if (!this._newPhysicsStarted) {
            if (this._newPhysics) {
                this._newPhysicsStarted = true;
            }
        }
}
}

export default MapBuilder;