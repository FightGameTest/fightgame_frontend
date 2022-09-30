import IAbstractGameObject from './IAbstractGameObject';
import IScreen from './IScreen';
import PixiLayer from './Pixi/PixiLayer';

class Screen implements IScreen {
    private _pixiLayer : PixiLayer;

    constructor(pixiLayer : PixiLayer) {
        this._pixiLayer = pixiLayer;
    }

    get fps() : number {
        return this._pixiLayer.fps;
    }

    get mouse() {
        return this._pixiLayer.mouse;
    }

    public startRenderer(width : number, height : number, antialias : boolean, transparent : boolean) {
        this._pixiLayer.createApplication(width, height, antialias, transparent);
    }

    public createContainer(
        particleMode : boolean = false,
        maxSize : number = 1500,
        properties : any = {},
        batchSize ?: number,
        autoResize ?: boolean
    ) : any {
        if (particleMode) {
            return this._pixiLayer.createParticleContainer(maxSize, properties, batchSize, autoResize);
        } else {
            return this._pixiLayer.createContainer();
        }
    }

    public createSprite(sheet : string, frame ?: string) : IAbstractGameObject {
        return <IAbstractGameObject><unknown>this._pixiLayer.createSprite(sheet, frame);
    }

    public drawRect(gfx: any, x: number, y: number, width: number, height: number, style: any) {
        this._pixiLayer.drawRect(gfx, x, y, width, height);
    }

    public createCustomSprite(sheetNames: string[]): IAbstractGameObject {
        let cs = this._pixiLayer.createCustomSprite();
        cs.init(sheetNames)

        return <IAbstractGameObject><unknown>cs;
    }

    public createSpine(name : string) : IAbstractGameObject {
        let so = <IAbstractGameObject><unknown>this._pixiLayer.createSpine(name);
        (<any>so).anchor = {
            x: 0.5,
            y: 0.5,
            set: (x : number, y : number = 0.5) => { }
        }

        return so;
    }

    public createGraphics() : IAbstractGameObject {
        let so = <IAbstractGameObject><unknown>this._pixiLayer.createGraphics();

        return so;
    }

    public createText(text : string, style : any) : IAbstractGameObject {
        let textObj = this._pixiLayer.createText(text, style);
        return <IAbstractGameObject><unknown>textObj;
    }

    public updateTexture(sprite : IAbstractGameObject, sheet : string, frame ?: string) {
        this._pixiLayer.updateTexture(<any>sprite, sheet, frame);
    }
}

export default Screen;