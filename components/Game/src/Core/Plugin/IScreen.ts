import IAbstractGameObject from "./IAbstractGameObject";

interface IScreen {
    startRenderer(width : number, height : number, antialias : boolean, transparent : boolean) : void;

    createContainer(
        particleMode : boolean,
        maxSize ?: number,
        properties ?: any,
        batchSize ?: number,
        autoResize ?: boolean
    ) : any;

    createSprite(sheet : string, frame ?: string) : IAbstractGameObject;
    createSpine(name : string) : IAbstractGameObject;
    createText(text : string, style : any) : IAbstractGameObject;
    createCustomSprite(sheetNames: string[]): IAbstractGameObject;
    updateTexture(sprite : IAbstractGameObject, sheet : string, frame ?: string) : void;
    drawRect(gfx: any, x: number, y: number, width: number, height: number, style: any): void;
    createGraphics() : IAbstractGameObject;
    fps : number;
    mouse : any;
}

export default IScreen;