import { Engine, World, Composite, Body, Bodies, Constraint, Vector, SAT} from 'matter-js';

import IPhysicsEntity from "../Data/IPhysicsEntity";

class NewPhysics {
    private _engine: Engine;

    private _objects: IPhysicsEntity[];

    private _lastUpdate: number;

    constructor() {

        this._engine = Engine.create();

        this._objects = [];
        this._lastUpdate = Date.now();
    }

    public addObject(object: IPhysicsEntity, options: any = null) {
        object.body = this._createBody(object, options);

        World.add(this._engine.world, <Body>object.body);

        //console.log("Adding object: ", object);
        //console.log("Adding object: ", object.body.position.x, object.position.y);

        this._objects.push(object);
    }

    public removeObject(object: IPhysicsEntity) {
        let i = this._objects.indexOf(object);

        if (i > -1) {
            if (this._objects[i].body != null) {
                World.remove(this._engine.world, <Body>this._objects[i].body);
            } else {
                console.error("Can't remove body which doesn't exist!");
            }

            
            this._objects.splice(i, 1);
        }
    }

    public setPosition(object: IPhysicsEntity, target: Vector) {
        if (object.body != null) {

            Body.setPosition(object.body, target);
        } else {
            console.error("Can't access body which doesn't exist!");
        }
    }

    public setVelocity(object: IPhysicsEntity, velocity: Vector) {
        if (object.body != null) {
            if (velocity.x == 0 && velocity.y != 0) velocity.x = object.body.velocity.x;
            if (velocity.y == 0) velocity.y = object.body.velocity.y;

            Body.setVelocity(object.body, velocity);
        } else {
            console.error("Can't access body which doesn't exist!");
        }
    }

    public setStatic(object: IPhysicsEntity, isStatic: boolean) {
        if (object.body != null) {
            Body.setStatic(object.body, isStatic);
        } else {
            console.error("Can't access body which doesn't exist!");
        }
    }

    public applyForce(object: IPhysicsEntity, force: Vector, fromX: number = object.position.x, fromY: number = object.position.y) {
        if (object.body != null) {
            Body.applyForce(object.body, {x: fromX, y: fromY}, force);
        } else {
            console.error("Can't access body which doesn't exist!");
        }
    }

    public collides(object: IPhysicsEntity, targets: IPhysicsEntity[]): boolean {
        let col = false;

        targets.forEach((target: IPhysicsEntity) => {
            if (object.body && target.body) {
                if (SAT.collides(object.body, target.body)) {
                    console.log(object, "collides with", target);
                    col = true;
                }
            }
            
        });

        return col;
    }


    public setCategory(object: IPhysicsEntity, category: number) {
        if (object.body) {
            object.body.collisionFilter.category = category;
        }
    }

    public setMask(object: IPhysicsEntity, category: number) {
        if (object.body) {
            object.body.collisionFilter.mask = category;
        }
    }

    public update(delta: number) {
        let now = Date.now();

        let diff = now - this._lastUpdate;

        this._objects.forEach((object: IPhysicsEntity) => {
            if ((<any>object.body).contVector.x != 0 || (<any>object.body).contVector.y != 0){
                this.setVelocity(object, {x: (<any>object.body).contVector.x, y: (<any>object.body).contVector.y});
            }
        })
        

        if (diff >= 4) {
            this._lastUpdate = now;
            //console.log("Update diff: ", diff);

            let oldValues = this._getObjPos();
            Engine.update(this._engine, 1000 / 60);
            let newValues = this._getObjPos();

            this._compareValues(oldValues, newValues);

            this._objects.forEach((object: IPhysicsEntity) => {
                if (object.body != null) {
                    let width = object.display.width;
                    let height = object.display.height;

                    let x1 = object.body.position.x;
                    let y1 = object.body.position.y;

                    object.position.x = x1;
                    object.position.y = y1;
                }
            })
        }



        
    }

    public setContVector(object: IPhysicsEntity, xy: {x: number, y: number}) {
        (<any>object.body).contVector = {x: xy.x, y: xy.y};
    }

    public createNew(): NewPhysics {
        return new NewPhysics();
    }

    private _randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    private _compareValues(old: {x: number, y: number}[], nw: {x: number, y: number}[]) {
        old.forEach((oldVal: {x: number, y: number}, index: number) => {
            let newVal = nw[index];

            if (this._setPositive(oldVal.x - newVal.x) >= 1 || this._setPositive(oldVal.y - newVal.y) >= 1) {
                //console.log(`Changed (${oldVal.x}, ${oldVal.y}) -> (${newVal.x}, ${newVal.y})`);
            }

        })
    }

    private _getObjPos() {
        let pos: {x: number, y: number}[] = [];

        this._objects.forEach((object: IPhysicsEntity) => {
            if (object.body != null) {
                pos.push({x: object.body.position.x, y: object.body.position.y});
            }
        })

        return pos;
    }


    private _createBody(object: IPhysicsEntity, options: any = null) {
        let width = object.display.width;
        let height = object.display.height * 0.5;

        let x = object.position.x - (width * object.position.anchorX);
        let y = object.position.y - (height * object.position.anchorY);

        //console.log("y: ", object.position.anchorY);

        //console.log(`height calc: object.position.y{${object.position.y}} + (height{${height}} * object.position.anchorY{${object.position.anchorY}})`)

        let body;

        if (options != null) {
            body = Bodies.rectangle(x, y, width, height, options);
        } else {
            body = Bodies.rectangle(x, y, width, height);
        }

        (<any>body).contVector = {x: 0, y: 0};

        //(<any>object).drawDebug(object.position.x - (width * object.position.anchorX), object.position.y - (height * object.position.anchorY), width, height);

        return body;
    }

    private _setPositive(val: number) {
        if (val < 0) {
            return val *-1;
        } else {
            return val;
        }
    }
}

export default NewPhysics;