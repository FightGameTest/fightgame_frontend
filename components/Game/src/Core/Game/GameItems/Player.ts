import Character from "../../Kernel/GameObjects/Character";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";
import { Positions, Sizes } from "../../Kernel/Data/ScaleMode";
import Config from "../../Kernel/Control/Config";
import IScreen from "../../Plugin/IScreen";
import IDirection from "../../../Common/Data/IDirection";
import AnimationDir from "../../../Common/Data/AnimationDir";
import {MaxMin, AnimationSide, CalculateDirection} from "../../../Common/Data/AnimationDir";
import NewPhysics from "../../../Common/Brain/NewPhysics";
import TimedStorage from "../../../Common/Brain/TimedStorage";
import Sprite from "../../Kernel/GameObjects/Sprite";
import IPhysicsEntity from "../../../Common/Data/IPhysicsEntity";
import BridgeConfig from "../../Plugin/React/BridgeConfig";
import ReactBridge from "../../Plugin/React/ReactBridge";

class Player {
    private _entityFactory : EntityFactory;
    private _spine : Character;
    private _animationDir: AnimationDir;
    private _moveTime : number;
    private _speedX : number;
    private _speedY : number;
    private _opponent : boolean;
    private _screen : IScreen;
    private _config : Config;
    private _bridgeConfig: BridgeConfig;
    private _reactBridge: ReactBridge;
    private _mouseDown : boolean;
    private _onUpdateMotion : Function;
    private _emptyNumber : number;
    private _animationMove: MaxMin | any;
    private _animationName : string;
    private _lerpLock: boolean;
    private _lerpData : {
        startX : number,
        startY : number,
        endX : number,
        endY : number,
        totalTime : number,
        issueTime : number,
        canLerp : boolean
    }

    private _mapObjects: Sprite[];

    private _xCache: TimedStorage;
    private _yCache: TimedStorage;

    private _idleLock: boolean;

    private _newPhysics: NewPhysics | null;

    constructor(entityFactory : EntityFactory, character : Character,
        screen : IScreen, config : Config, animationDir: AnimationDir,
        xCache: TimedStorage, yCache: TimedStorage, bridgeConfig: BridgeConfig,
        reactBridge: ReactBridge) {
        console.log("ver: 0.6.0");

        this._entityFactory = entityFactory;
        this._spine = character;
        this._newPhysics = null;

        this._screen = screen;
        this._animationDir = animationDir;
        this._lerpLock = false;

        this._idleLock = true;


        this._moveTime = -1;
        this._onUpdateMotion = () => { };

        this._speedX = 5;
        this._speedY = 9;
        this._opponent = false;
        this._mouseDown = false;

        this._config = config;

        this._emptyNumber = 0;
        this._animationName = "";
        this._animationMove = {};

        this._lerpData = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            totalTime: 0,
            issueTime: 0,
            canLerp: false
        }

        this._xCache = xCache;
        this._yCache = yCache;

        this._bridgeConfig = bridgeConfig;
        this._reactBridge = reactBridge;
        this._reactBridge.forceAvailableGlobal();

        this._mapObjects = [];
    }

    get animationName() : string {
        return this._animationName;
    }

    get emptyNumber() : number {
        return this._emptyNumber;
    }

    get opponent() : boolean {
        return this._opponent;
    }

    get sprite() : Character {
        return this._spine;
    }

    get moveTime() : number {
        let mt = this._moveTime;
        this._moveTime = -1;

        return mt;
    }

    set moveTime(val : number) {
        this._moveTime = val;
    }

    set opponent(val : boolean) {
        this._opponent = val;
    }

    set mapObjects(val: Sprite[]) {
        this._mapObjects = val;
    }

    public createNew() {
        return new Player(this._entityFactory, this._spine.createNew(), this._screen, this._config, this._animationDir.createNew(), this._xCache.createNew(), this._yCache.createNew(), this._bridgeConfig, this._reactBridge);
    }

    public init(x : number, y : number, onUpdateMotion : Function, newPhysics: NewPhysics, opponent = false) {
        this._newPhysics = newPhysics;

        this._opponent = opponent;
        this._onUpdateMotion = onUpdateMotion;

        this._setAnimationKeys();

        let sprite = "pirate";

        console.log("using sprite: ", sprite);

        this._spine = this._entityFactory.character(x, y, [
            "body",
            "fhand",
            "top",
            "gloveb",
            "glovef",
            "bottom",
            "head",
            "face",
            "hair",
        ]);
        this._spine.position.anchorX = 0.5;
        this._spine.position.anchorY = 0.8;
        this._spine.display.scaleX = 1.4;
        this._spine.display.scaleY = 1.4;
        this._spine.setAnimation('idle', 1, {
            body: 5,
            hair: 4
        });

        this._spine.enableInput();

        let that = this;

        this._spine.position.trackX = (position: number) => {
            that._xCache.addData(position);
        }

         this._spine.position.trackY = (position: number) => {
            that._yCache.addData(position);
        }
        


        if (!this._opponent) this._addListeners();


        if (!opponent) {
            this._newPhysics.addObject(this._spine, {isStatic: false});
            this._newPhysics.setCategory(this._spine, 2);
            this._newPhysics.setMask(this._spine, 1);

            console.log("spine id: ", this._spine.id);
        }


        if (!opponent) (<any>window).Player = this._spine;
        
        //console.log("Player done");
    }

    private _yDiffBetween(object: IPhysicsEntity, targets: IPhysicsEntity[], min: number, max: number) {
        let res = false;

        targets.forEach((target: IPhysicsEntity) => {
            if (target.position.y - object.position.y > min && target.position.y - object.position.y < max) {
                console.log("jump diff: ", target.position.y - object.position.y);
                res = true;
            }
        });

        return res;
    }

    public enableLerp(lerpInstructions : { start : { x : number, y : number }, end : { x : number, y : number }, time : number }) {
        this._lerpData = {
            startX: lerpInstructions.start.x,
            startY: lerpInstructions.start.y,
            endX: lerpInstructions.end.x,
            endY: lerpInstructions.end.y,
            totalTime: lerpInstructions.time,
            issueTime: Date.now(),
            canLerp: true
        }
    }

    public disableLerp() {
        this._lerpData.canLerp = false;
    }

    public update() {

        let isShown = this._reactBridge.getValue(this._bridgeConfig.CHAT_SHOWWINDOWSTATUSPROP, null);

        

        if (this._lerpData.canLerp) {
            this._doLerp();
        }


        let isAEnterDown = this._spine.input.isDown("Enter");

        if (isAEnterDown) {
            this._reactBridge.execute(this._bridgeConfig.CHAT_SHOWWINDOW, true);
            this._stopMoving();
        }

        if (!isShown) this._handleKeyboardMove();
    }

    private _handleKeyboardMove() {
        if (!this._opponent) {
            let keyUp = "ArrowUp";
            let keyDown = "ArrowDown";
            let keyLeft = "ArrowLeft";
            let keyRight = "ArrowRight";

            let keyW = "KeyW";
            let keyS = "KeyS";
            let keyA = "KeyA";
            let keyD = "KeyD";

            let upDown = this._spine.input.isDown(keyUp) || this._spine.input.isDown(keyW);
            let downDown = this._spine.input.isDown(keyDown) || this._spine.input.isDown(keyS);
            let leftDown = this._spine.input.isDown(keyLeft) || this._spine.input.isDown(keyA);
            let rightDown = this._spine.input.isDown(keyRight) || this._spine.input.isDown(keyD);


            if (upDown && this._yDiffBetween(this._spine, this._mapObjects, 83, 85)) {
                //console.log("Trying to move up!");
                this._moveUp();
            }


            //if (downDown) this._moveDown();
            if (leftDown && !rightDown) this._moveLeft();
            if (rightDown && !leftDown) this._moveRight();

            if (!upDown && !downDown && !leftDown && !rightDown) this._stopMoving();

        }
    }


    private _doLerp() {
        let timeDiff = Date.now() - this._lerpData.issueTime;
        let timePerc = timeDiff / this._lerpData.totalTime;

        if (timePerc > 1) timePerc = 1;

        let newX = this._lerp(this._lerpData.startX, this._lerpData.endX, timePerc);
        let newY = this._lerp(this._lerpData.startY, this._lerpData.endY, timePerc);

        if (!this._opponent) {
            this._newPhysics?.setPosition(this.sprite, {x: newX, y:  newY});
        }

        this.sprite.position.x = newX;
        this.sprite.position.y = newY;

        if (this.sprite.position.x == this._lerpData.endX && this.sprite.position.y == this._lerpData.endY) this.disableLerp();
    }

    private _setAnimationKeys() {
        let animations = [
                            {label: "LEFT",         key: "walk",         sideX: AnimationSide.Negative,     sideY: AnimationSide.Positive},
                            {label: "RIGHT",        key: "walk",         sideX: AnimationSide.Positive,     sideY: AnimationSide.Positive},
                            {label: "UP",           key: "walk",         sideX: AnimationSide.Same,         sideY: AnimationSide.Positive},
                            {label: "DOWN",         key: "walk",         sideX: AnimationSide.Same,         sideY: AnimationSide.Positive},
                            {label: "LEFTUP",       key: "walk",         sideX: AnimationSide.Negative,     sideY: AnimationSide.Positive},
                            {label: "LEFTDOWN",     key: "walk",         sideX: AnimationSide.Negative,     sideY: AnimationSide.Positive},
                            {label: "RIGHTUP",      key: "walk",         sideX: AnimationSide.Positive,     sideY: AnimationSide.Positive},
                            {label: "RIGHTDOWN",    key: "walk",         sideX: AnimationSide.Positive,     sideY: AnimationSide.Positive},
                            {label: "IDLE",         key: "idle",         sideX: AnimationSide.Same,         sideY: AnimationSide.Positive}
                         ];

        this._animationDir.setAnimations(animations);
    }

    private _moveRequirements() {
        this._lerpLock = true;
        this._idleLock = false;

        setTimeout(() => {
            this._lerpLock = false;
        }, 400);
    }

    private _moveUp() {
        if (this._speedY > 0) {
            this._moveRequirements();
            let vx = 0;
            let vy = this._speedY * -1;

            this.showAnimation("UP");
            this._newPhysics?.setVelocity(this._spine, {x: vx, y: vy});

            this._sendVector(vx, vy);
        }        
    }

    private _moveTopRight() {
        this._moveRequirements();
        

        this.showAnimation("RIGHTUP");
    }

    private _moveBottomRight() {
        this._moveRequirements();
       

        this.showAnimation("RIGHTDOWN");
    }

    private _moveBottomLeft() {
        this._moveRequirements();
       

        this.showAnimation("LEFTDOWN");
    }

    private _moveTopLeft() {
        this._moveRequirements();
        

        this.showAnimation("LEFTUP");
    }

    private _moveDown() {
        this._moveRequirements();
       

        this.showAnimation("DOWN");
    }

    private _moveLeft() {
        this._moveRequirements();
      

        this.showAnimation("LEFT");

        let vx = this._speedX * -1;
        let vy = 0;

        this._newPhysics?.setContVector(this._spine, {x: vx, y: vy});
        this._sendVector(vx, vy);
    }

    private _moveRight() {
        this._moveRequirements();
        

        this.showAnimation("RIGHT");

        let vx = this._speedX * 1;
        let vy = 0;

        this._newPhysics?.setContVector(this._spine, {x: vx, y: vy});
        this._sendVector(vx, vy);
    }

    private _updateKeyboardMotion(vx : number, vy : number) {
        //Change speed to vector
        let newVx = vx;
        let newVy = vy;

        if (newVx != this._spine.body.vx || newVy != this._spine.body.vy) this._sendVector(newVx, newVy);
    }

    private _moveTowardsMouse() {
        let rad = this._getRad();

        let vx = Math.cos(rad) * this._speedX;
        let vy = Math.sin(rad) * this._speedY;

        if (vx != this._spine.body.vx || vy != this._spine.body.vy) this._sendVector(vx, vy);
    }


    private _sendVector(vx : number, vy : number) {
        let dir : IDirection = {
            startTime: Date.now(),
            vectorX: vx,
            vectorY: vy,
            animation: this._animationMove,
            scaleX: this._spine.display.scaleX,
            scaleY: this._spine.display.scaleY
        }

        //console.log("Sending vector: ", dir);

        this._onUpdateMotion(dir);
    }

    private _addListeners() {
        let canvas = document.getElementsByTagName('canvas')[0];

        canvas.addEventListener('mousedown', (e) => {
            //e.preventDefault();
            this.printAngle(true);
            this._mouseDown = true;
        });


        document.addEventListener('mouseup', (e) => {
            this._mouseDown = false;
            this._stopMoving();
        });
    }

    public printAngle(print = false) {
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;

        let ex = this._screen.mouse.mouse.global.x;
        let ey = this._screen.mouse.mouse.global.y;

        let dy = ey - cy;
        let dx = ex - cx;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)



        if (print) console.log(theta);

        return theta;
    }

    private _getRad() {
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;

        let ex = this._screen.mouse.mouse.global.x;
        let ey = this._screen.mouse.mouse.global.y;

        let dy = ey - cy;
        let dx = ex - cx;
        let theta = Math.atan2(dy, dx); // range (-PI, PI]

        return theta;
    }

    private _addMouseMoves() {
        let vx = 0;
        let vy = 0;

        document.addEventListener('mousedown touchstart', (e) => {
            e.preventDefault();
            if (this._screen.mouse.mouse.global.x > ((this._config.width / 2) + 50)) {

            } else {

            }



        });
    }

    private _stopMoving() {
        if (!this._idleLock) {
            this._idleLock = true;

            this.showAnimation("IDLE");
            this._newPhysics?.setContVector(this._spine, {x: 0, y: 0});

            this._sendVector(0, 0);
        }
        



        //this._newPhysics?.setContVector(this._spine, {x: 0, y: 0});
    }

    public forceAnimation(animation: MaxMin) {
        let animName = animation.animation;


        if (animName != this._animationName || this._animationMove.sideX != animation.sideX) {
            console.log(`Animation Name: ${animName}`);

            let scaleX = this._spine.display.scaleX;
            let scaleY = this._spine.display.scaleY;

            if (animation.sideX == AnimationSide.Negative) {
                scaleX = this._makeNegative(scaleX);
                console.log("Negated scaleX");
            } else if (animation.sideX == AnimationSide.Positive) {
                scaleX = this._makePositive(scaleX);
            }

            if (animation.sideY == AnimationSide.Negative) {
                scaleY = this._makeNegative(scaleY);
            } else if (animation.sideY == AnimationSide.Positive) {
                scaleY = this._makePositive(scaleY);
            }


            this._spine.setAnimation(animName, 1, {
                body: 5,
                fhand: 4
            });
            
            this._animationName = animName;
            this._spine.display.scaleX = scaleX;
            this._spine.display.scaleY = scaleY;

            this._animationMove = animation;
        }
    }


    public showAnimation(name : string) {
        let animation = this._animationDir.animForLabel(name);
        this.forceAnimation(animation);
    }

    private _makePositive(val: number) {
        if (val < 0 ) return val * -1;
        return val;
    }

    private _makeNegative(val: number) {
        if (val > 0) return val * -1;
        return val;
    }

    private _lerp(start : number, end : number, amount : number) {
        return start + ((end - start) * amount);
    }

}

export default Player;