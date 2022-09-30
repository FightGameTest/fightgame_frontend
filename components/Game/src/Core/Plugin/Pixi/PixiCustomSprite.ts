type CustomSprite = {sprite: PIXI.AnimatedSprite | null, sheet: PIXI.Spritesheet | undefined, sheetKey: string};

import * as PIXI from "pixi.js"

class PixiCustomSprite extends PIXI.Container {
  private _currentAnimation: string;
  private _sprites: CustomSprite[];
  private _init: boolean;


  private _anchorX = 0;
  private  _anchorY = 0;

  public anchor: {set: Function};


  set anchorX(value) {
      this._anchorX = value;
      this.pivot.x = value * this.width / this.scale.x;
  }

  get anchorX() {
      return this._anchorX;
  }

  set anchorY(value) {
      this._anchorY = value;
      this.pivot.y = value * this.height / this.scale.y;
  }

  get anchorY(){
      return this._anchorY;
  }


  constructor() {
    super();

    this._currentAnimation = "";
    this._sprites = [];
    this._init = false;

    this.anchor = {
      set: (x: number, y: number) => {
        this.anchorX = x;
        this.anchorY = y;
      }
    }
  }

  public init(sheetNames: string[]) {
    sheetNames.forEach((name: string) => {
      let sheet = PIXI.Loader.shared.resources[name].spritesheet;
      

      let sprite: PIXI.AnimatedSprite | null = null;

      console.log("sheet.textures", name);


      let textureArr: any[] = [];

      if (sheet && sheet.textures) textureArr = this._turnArray(sheet?.textures);

      if (sheet && textureArr[0] != null) {
        sprite = new PIXI.AnimatedSprite([textureArr[0]]);

        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        sprite.y = 0;
        sprite.x = 0;

        //nextY += sprite.height;
      }

      this._sprites.push({sprite: null, sheet: sheet, sheetKey: name});
    })
  }

  private _getSpeed(sheetKey: string, speeds: any = null) {
    let speed = 1;

    if (speeds != null) {
      for (const key in speeds) {
        if (key == sheetKey) {
          speed = speeds[key];
        }
      }
    }

    console.log(`Sending speed for sprite ${sheetKey} = ${speed}`);

    return speed;
  }

  public setAnimation(name: string, speed: number = 1, speeds: any = null) {
    if (this._currentAnimation === name) return;

    let animationSet = false;

    //console.log("Setting animation: ", name, speed);

    this._sprites.forEach((element: CustomSprite) => {
      const textures = element.sheet?.animations[name];

      //console.log("animation textures", textures);

      if (textures) {
        if (!element.sprite) {
          element.sprite = new PIXI.AnimatedSprite(textures);
          this.addChild(element.sprite);
        } else {
          element.sprite.textures = textures;
        }

        element.sprite.animationSpeed = this._getSpeed(element.sheetKey, speeds);
        element.sprite.play();
      } else {
        let defaultTexture = null;

        if (element.sheet?.animations) defaultTexture = this._turnArray(element.sheet?.animations)[0];

        

        if (defaultTexture) {

          //console.log("default", defaultTexture)

          if (!element.sprite) {
            element.sprite = new PIXI.AnimatedSprite(defaultTexture);
            this.addChild(element.sprite);
          } else {
            element.sprite.textures = defaultTexture;
          }

          element.sprite.animationSpeed = speed;
          element.sprite.play();
        }
      }
    });

    if (animationSet) this._currentAnimation = name;
  }

  private _turnArray(obj: any) {
        let keys = Object.keys(obj);
        let arr: any[] = [];

        keys.forEach((key: string) => {
            arr.push(obj[key]);
        })

        return arr;
    }
}

export default PixiCustomSprite;