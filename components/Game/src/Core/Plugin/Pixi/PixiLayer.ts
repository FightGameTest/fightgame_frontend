import * as PIXI from "pixi.js"
import Resource from "../../Kernel/Data/Resource";
import type { Dict } from '@pixi/utils';
import PxText from "./PxText";
import { Spine } from "pixi-spine";
import PixiCustomSprite from "./PixiCustomSprite";

class PixiLayer {
    private _app : PIXI.Application | null;
    private _pxText : PxText;

    constructor(pxText : PxText) {
        this._app = null;
        this._pxText = pxText;
    }

    get renderer() : PIXI.Renderer | PIXI.AbstractRenderer | null {
        if (this._app) {
            return this._app.renderer;
        } else {
            return null;
        }
    }

    get fps() : number {
        return PIXI.Ticker.shared.FPS;
    }

    get stage() : PIXI.Container | null {
        if (this._app) {
            return this._app.stage;
        } else {
            return null;
        }
    }

    get mouse() {
        if (this._app) {
            return this._app.renderer.plugins.interaction;
        } else {
            return null;
        }
    }

    public createApplication(width : number, height : number, antialias : boolean, transparent : boolean) {
        let alphaValue = 1;
        if (transparent) alphaValue = 0;

        let app = new PIXI.Application({
            width: width,
            height: height,
            antialias: antialias,
            backgroundAlpha: alphaValue
        });


        if ((<any>window)["pixiDivTarget"]) {
            (<any>window)["pixiDivTarget"].appendChild(app.view);
        } else {
            document.body.appendChild(app.view);
        }


        this._app = app;
    }

    public createCustomSprite(): PixiCustomSprite {
        return new PixiCustomSprite();
    }

    public createContainer() : PIXI.Container {
        return new PIXI.Container();
    }

    public createGraphics(): PIXI.Graphics {
        let gfx = new PIXI.Graphics();

        return gfx;
    }

    public drawRect(gfx: PIXI.Graphics, x: number, y: number, width: number, height: number) {
        gfx.clear();
        //gfx.beginFill(0xFFFF00);
        gfx.lineStyle(5, 0xFFFF00);
        gfx.drawRect(x, y, width, height);
    }

    public createText(text : string, style : any) : PxText {
        let pt = this._pxText.createNew();
        pt.init(text, (<PIXI.Renderer>(<PIXI.Application>this._app).renderer), style);

        return pt;
    }

    public createParticleContainer(
        maxSize : number = 1500,
        properties : PIXI.IParticleProperties = {},
        batchSize ?: number,
        autoResize ?: boolean
    ) : PIXI.ParticleContainer {
        return new PIXI.ParticleContainer(maxSize, properties, batchSize, autoResize);
    }

    public createSprite(sheet : string, frame ?: string) : PIXI.Sprite | null {
        let texture = this._getTexture(sheet, frame);

        if (texture) {
            return new PIXI.Sprite(texture);
        } else {
            return null;
        }
    }

    public createSpine(name : string) : Spine | null {
        let spineTexture = this._getSpineData(name);

        if (spineTexture) {
            return new Spine(spineTexture);
        } else {
            return null;
        }
    }

    public updateTexture(sprite : PIXI.Sprite, sheet : string, frame ?: string) {
        let texture = this._getTexture(sheet, frame);
        if (texture) {
            sprite.texture = texture;
        }
    }

    public addObject(container : PIXI.Container, child : any) {
        container.addChild(child);
    }

    public removeObject(container : PIXI.Container, child : any) {
        container.removeChild(child);
    }

    public addImages(imgList : Resource[]) {
        this._addResources(imgList);
    }

    public addAtlases(atlasList : Resource[]) {
        this._addResources(atlasList);
    }

    public async downloadResources(onProgress : Function, onComplete : Function) : Promise<Dict<PIXI.LoaderResource>> {
        return new Promise((resolve : Function, reject : Function) => {
            PIXI.Loader.shared.onProgress.once(() => {
                onProgress(PIXI.Loader.shared.progress);
            });

            PIXI.Loader.shared.load((loader : PIXI.Loader, resources : Dict<PIXI.LoaderResource>) => {
                resolve(resources);

                (<any>window).loader = PIXI.Loader.shared;

                onComplete();
            });
        });
    }

    private _turnArray(obj: any) {
        let keys = Object.keys(obj);
        let arr: any[] = [];

        keys.forEach((key: string) => {
            arr.push(obj[key]);
        })

        return arr;
    }

    private _addResources(resList : Resource[]) {
        for (let c = 0; c < resList.length; c++) {
            let name = resList[c].name;
            let url = resList[c].url;

            PIXI.Loader.shared
            .use((resource: PIXI.LoaderResource, next) => {

                if (resource.extension === 'json' && resource.data.meta != null && resource.data.meta.app.indexOf("aseprite") > -1) {

                    //console.log("meta: ", resource.data.meta);

                  for (const tag of resource.data.meta.frameTags) {
                    const frames: {texture: any, time: any}[] = [];

                    let dataFrames = this._turnArray(resource.data.frames);
                    let dataTextures = this._turnArray((<any>resource).textures);

                    //console.log("textures: ", (<any>resource).textures);



                    for (let i = tag.from; i < tag.to; i++) {
                      if (dataFrames[i] != null) frames.push({ texture: dataTextures[i], time: dataFrames[i].duration });
                    }
                    if (tag.direction === 'pingpong') {
                      for (let i = tag.to; i >= tag.from; i--) {
                        if (dataFrames[i] != null) frames.push({ texture: dataTextures[i], time: dataFrames[i].duration });
                      }
                    }


                    (<any>resource).spritesheet.animations[tag.name] = frames;
                    //console.log("frames: ", frames);
                  }
                }

                next();
            })
            .add(name, url);
        }
    }

    private _getTexture(sheet : string, frame ?: string) : PIXI.Texture | null {
        if (frame) {
            let spritesheet = PIXI.Loader.shared.resources[sheet].spritesheet;

            if (spritesheet) {
                return spritesheet.textures[frame];
            } else {
                console.error("NO spritesheet '%s' found!", sheet);
                return null;
            }
        } else {
            return PIXI.Texture.from(sheet);
        }
    }

    private _getSpineData(name : string) {
        let texture = PIXI.Loader.shared.resources[name];

        if (texture) {
            return texture.spineData;
        } else {
            return null;
        }
    }
}

export default PixiLayer;