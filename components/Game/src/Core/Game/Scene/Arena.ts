import IGfxLoader from "../../Plugin/IGfxLoader";
import IDataLoader from "../../Plugin/IDataLoader";
import Resource from "../../Kernel/Data/Resource";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";

import IScene from "../../Kernel/GameObjects/IScene";
import ISceneManager from "../../Plugin/ISceneManager";
import Sprite from "../../Kernel/GameObjects/Sprite";
import Text from "../../Kernel/GameObjects/Text";
import Camera from "../Control/Camera";
import Background from "../GameItems/Background";
import Player from "../GameItems/Player";
import Config from "../../Kernel/Control/Config";
import SlowEvent from "../Control/SlowEvent";
import MapBuilder from "../GameItems/MapBuilder";
import WsServer from "../../Plugin/WsServer";

import ICommunication from "../../../Common/Data/ICommunication";
import IDirection from "../../../Common/Data/IDirection";
import IPhysicsEntity from "../../../Common/Data/IPhysicsEntity";
import IChatData from "../../../Common/Data/IChatData";
import ChatBot from "../Control/ChatBot";

import NewPhysics from "../../../Common/Brain/NewPhysics";
import PingTest from "../Control/PingTest";
import SocketTypes from "../../../Common/Data/SocketTypes";
import Character from "../../Kernel/GameObjects/Character";
import GameAPI from "../Control/GameAPI";
import BridgeConfig from "../../Plugin/React/BridgeConfig";
import ReactBridge from "../../Plugin/React/ReactBridge";

class Arena implements IScene {
    private _gfxLoader : IGfxLoader;
    private _dataLoader : IDataLoader;
    private _resource : Resource;
    private _entityFactory : EntityFactory;
    private _sceneManager : ISceneManager;
    private _map : Sprite;
    private _camera : Camera;
    private _player : Player;
    private _config : Config;
    private _enemies : Player[];
    private _slowEvent : SlowEvent;
    private _mapBulilder : MapBuilder;
    private _wsServer : WsServer;
    private _chatbot : ChatBot;
    private _background: Background;
    private _newPhysics:  NewPhysics;
    private _pingTest: PingTest;
    private _socketTypes: SocketTypes;
    private _hudText: Text;
    private _gameAPI: GameAPI;
    private _bridgeConfig: BridgeConfig;
    private _reactBridge: ReactBridge;

    private _updateTimes : number[];
    private _lastServerUpdate : number;

    private _canUpdate: boolean;

    private _char: Character;

    constructor(gfxLoader : IGfxLoader, dataLoader : IDataLoader, resource : Resource,
        entityFactory : EntityFactory, sceneManager : ISceneManager, map : Sprite, hudText: Text, camera : Camera,
        player : Player, config : Config, slowEvent : SlowEvent, mapBuilder : MapBuilder, wsServer : WsServer,
        chatBot : ChatBot, background: Background, newPhysics: NewPhysics, pingTest: PingTest, socketTypes: SocketTypes, char: Character, gameAPI: GameAPI,
        bridgeConfig: BridgeConfig, reactBridge: ReactBridge) {
        this._gfxLoader = gfxLoader;
        this._dataLoader = dataLoader;
        this._resource = resource;
        this._entityFactory = entityFactory;
        this._sceneManager = sceneManager;
        this._map = map;
        this._hudText = hudText;
        this._camera = camera;
        this._player = player;
        this._config = config;
        this._slowEvent = slowEvent;
        this._mapBulilder = mapBuilder;
        this._wsServer = wsServer;
        this._chatbot = chatBot;
        this._background = background;
        this._newPhysics = newPhysics;
        this._pingTest = pingTest;
        this._socketTypes = socketTypes;

        this._bridgeConfig = bridgeConfig;
        this._reactBridge = reactBridge;
        this._reactBridge.forceAvailableGlobal();

        this._char = char;

        this._gameAPI = gameAPI;

        this._canUpdate = true;

        this._enemies = [];
        this._updateTimes = [
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150,
            150
        ];

        this._lastServerUpdate = -1;
    }

    public async preload() : Promise<void> {

    }

    public create() {
        //console.log("show chat", (window as any).forceShowChat);



        //(window as any).forceShowChat(true); // TODO, see if can remove 'window'
        // this._global.setShowChat(true);

        this._background.sprite.enableInput();


        this._background.sprite.input.addKeyDown("KeyC", () => {
            console.log("KeyC")
            this._reactBridge.execute(this._bridgeConfig.INFO_SHOWWINDOW, true);
        })


        this._background.sprite.input.addKeyDown("KeyP", () => {
            this._reactBridge.execute(this._bridgeConfig.FRIEND_SHOWWINDOW, true);
        })


        this._background.sprite.input.addKeyDown("KeyB", () => {
            console.log("KeyB")
            this._reactBridge.execute(this._bridgeConfig.EQU_SHOWWINDOW, true);
        })

        this._background.sprite.input.addKeyDown("Enter", () => {
            let originalShow = this._reactBridge.getValue(this._bridgeConfig.CHAT_SHOWWINDOWSTATUSPROP, null);

            

            if (originalShow) {
                this._reactBridge.execute(this._bridgeConfig.CHAT_SENDNOW, null);
            } else {
                //this._reactBridge.execute(this._bridgeConfig.CHAT_SHOWWINDOW, true);
            }
        });

        this._background.sprite.input.addKeyDown("Escape", () => {
            this._reactBridge.execute(this._bridgeConfig.CHAT_SHOWWINDOW, false);
            this._reactBridge.execute(this._bridgeConfig.INFO_SHOWWINDOW, false);
            this._reactBridge.execute(this._bridgeConfig.EQU_SHOWWINDOW, false);

            
        });

        

        console.log("On Arena!");
        this._slowEvent.init(60);

        console.log("Fiat2", this._dataLoader.getData("Fiat2").composite.sImages);

        this._background.init(0, 0, 'back');

        this._addHud();


        this._mapBulilder.init(this._newPhysics);


        this._mapBulilder.addObjects(this._dataLoader.getData("Fiat2").composite.sImages, "new_main");

        (<any>window).mapBuilder = this._mapBulilder;


        


        this._player.init(250, 3568 - 2000, (dir : IDirection) => {
            this._updateMotion(dir);
        }, this._newPhysics);

        this._player.mapObjects = this._mapBulilder.spriteList;
        
        this._camera.onUpdate = () => {
            this._updateCamera();
        }


        this._camera.x = -1300;
        this._camera.y = -1800;

        this._char = this._entityFactory.character(this._player.sprite.position.x, this._player.sprite.position.y, [
                "body",
                "face",
                "gloveb",
                "hair",
                "top",
                "bottom",
                "fhand",
                "glovef",
                "head"
            ]);


        (<any>window).camera = this._camera;

        (<any>window).char = this._char

        this._startServer().then(() => {
            console.log(`Ws Server init done`);
            this._canUpdate = true;
            this._pingTest.init();


            this._reactBridge.addEntry(this._bridgeConfig.CHAT_SENDMESSAGE, (msg : string) => {
                this._chatbot.sendMessage(this._player.sprite.id, msg, this._wsServer);
            }, null);

            (<any>window).sendChat = (msg : string) => {
                this._chatbot.sendMessage(this._player.sprite.id, msg, this._wsServer);
            }
        })
    }

    private _addHud() {
        this._hudText = this._entityFactory.text(50, 50, "Ping: <Calculating>", {"fontSize": 60, "fill": "white"});


        this._hudText.position.anchorX = 0;
        this._hudText.position.anchorY = 0;

        this._hudText.position.disableCamera = true;

        this._hudText.position.fitInsideContainer(false);

        this._hudText.display.visible = true;
    }

    public update() {

        

        //console.log("keyA: ", this._background.sprite.input.isDown("KeyA"));
        //console.log("Key Enter: ", this._background.sprite.input.isDown("Enter"));

        if (!this._canUpdate) return;
        //console.log("Camera: ", this._camera.x, this._camera.y);

        this._char.position.x = this._player.sprite.position.x;
        this._char.position.y = this._player.sprite.position.y;

        this._pingTest.test();

        this._newPhysics.update(0);

        this._player.update();

        for (let c = 0; c < this._enemies.length; c++) {
            let enemy = this._enemies[c];
            enemy.update();
        }

        let targetX = (this._player.sprite.position.x - (this._config.width / 2)) * -1;
        let targetY = (this._player.sprite.position.y - (this._config.height / 2)) * -1;


        //console.log(targetX, targetY);

        if (this._camera.x != targetX) this._camera.x = targetX;
        if (this._camera.y != targetY) this._camera.y = targetY;


        let canExecute = this._slowEvent.canExecute();

        if (canExecute) this._updatePlayerPosition();


        //this._player.printAngle();
    }

    public shutdown() {

    }

    private _addListeners() {

    }

    private _updatePlayerPosition() {

    }

    private _startServer() {
        console.log("Starting server...");
        return this._wsServer.startServer(this._onMessages.bind(this));
    }

    private _onMessages(message : ICommunication) {
        //console.log(`message.type: ${message.type}`);
        if (message.type == "world_update") {
            this._recievedWorldUpdate(message.data);
        } else if (message.type == "remove_player") {
            this._deletePlayer(message.data.id);
        } else if (message.type == "chat_message") {
            this._handleChat(message.data);
        } else if (message.type == "chat_update") {
            this._handleChatUpdate(message.data);
        } else if (message.type == this._socketTypes.TEST_PING) {
            this._handlePing(message.data);
        }
    }


    private _handlePing(data: {time: number}) {
        let now = Date.now();
        let ping = now - data.time;

        //console.log(`Current ping, which is ${now} - ${data.time} = ${ping}`);

        this._hudText.label.text = "Ping: " + ping;
    }

    private _handleChatUpdate(data: IChatData[]) {
        data.forEach((data: IChatData, index: number) => {

            this._reactBridge.execute(this._bridgeConfig.CHAT_UPDATEDATA, {
                id: data.id,
                message: data.message,
                channels: ["General"],
                isYou: data.id == this._player.sprite.id
            });
        })
    }

    private _handleChat(data : IChatData) {
        let isYou = data.id == this._player.sprite.id;

        this._reactBridge.execute(this._bridgeConfig.CHAT_UPDATEDATA, {
            id: data.id,
            message: data.message,
            channels: ["General"],
            isYou: isYou
        });

        this._chatbot.printMessage(data.id, data.message, isYou);
    }

    private _deletePlayer(id : number) {
        for (let c = 0; c < this._enemies.length; c++) {
            let enemy = this._enemies[c];
            if (enemy.sprite.id == id) {
                this._enemies.splice(c, 1);
                enemy.sprite.destroy();
                return;
            }
        }
    }

    private _recievedPlayerInfo(info : any) {
        this._player.sprite.position.x = info._position.x;
        this._player.sprite.position.y = info._position.y;

        this._player.sprite.body.vx = info._body.vx;
        this._player.sprite.body.vy = info._body.vy;

        //console.log(`PlayerX: ${this._player.sprite.position.x} vs info_position.x: ${info._position.x}`);
    }

    private _recievedWorldUpdate(playerList : any) {
        if (this._lastServerUpdate < 0) this._lastServerUpdate = Date.now();
        let playerID = playerList.id;
        let currentTime = Date.now();

        this._addTimeDiff(currentTime - this._lastServerUpdate);

        this._putID(playerID);

        let list : IPhysicsEntity[] = playerList.players;

        for (let c = 0; c < list.length; c++) {
            let entity = list[c];

            if (entity.id !== this._player.sprite.id) {
                this._settleEnemy(entity);
            } else {
                this._lerpPlayer(entity);
            }
        }


        this._lastServerUpdate = currentTime;
    }

    private _settleEnemy(entity : IPhysicsEntity) {
        let enemyIndex = this._getElement(entity.id);

        if (enemyIndex > -1) {
            this._setEnemy(enemyIndex, entity);
        } else {
            this._createEnemy(entity);
        }
    }

    private _lerpPlayer(entity: IPhysicsEntity) {
        //console.log(`Lerping from Original: (${entity.position.x}, ${entity.position.y})`);

        this._player.enableLerp({
            start: {
                x: this._player.sprite.position.x,
                y: this._player.sprite.position.y
            },
            end: {
                x: entity.position.x,
                y: entity.position.y
            },
            time: this._getLerpTime()
        })

    }

    private _setEnemy(index : number, entity : IPhysicsEntity) {
        let currentTime = Date.now();

        let element = this._enemies[index];

        //console.log(`Time between updates: ${currentTime} - ${this._lastServerUpdate} = ${currentTime - this._lastServerUpdate}`);
        //console.log(`this._getLerpTime(): ${this._getLerpTime()}`)

        element.enableLerp({
            start: {
                x: element.sprite.position.x,
                y: element.sprite.position.y
            },
            end: {
                x: entity.position.x,
                y: entity.position.y
            },
            time: this._getLerpTime()
        })

        let anyEntity : any = entity; // As animation, scaleX and scaleY are not in IPhysicsEntity but still in server's player

        //console.log("current Animation: ", anyEntity.animation);
        //console.log("Entity: ", anyEntity);

        if (anyEntity.animation != null) element.forceAnimation(anyEntity.animation);
    }


    private _addTimeDiff(diff : number) {
        this._updateTimes.splice(0, 1);
        this._updateTimes.push(diff);
    }

    private _getLerpTime() : number {
        let total = 0;

        for (let c = 0; c < this._updateTimes.length; c++) {
            total += this._updateTimes[c];
        }

        return total / this._updateTimes.length;
    }

    private _putID(id : number) {
        this._player.sprite.id = id;
    }

    private _getEnemy(id : number) {
        for (let c = 0; c < this._enemies.length; c++) {
            let enemy = this._enemies[c];
            if (enemy.sprite.id == id) return enemy;
        }

        return null;
    }

    private _startServerOLD() {
        /*
        this._socket = io();
    
        console.log("Emitting new user!");
    
        this._socket.emit('new_user', {
          x: this._player.sprite.position.x,
          y: this._player.sprite.position.y,
          vx: this._player.sprite.body.vx,
          vy: this._player.sprite.body.vy
        });
    
        this._socket.on('game_details', (data: any) => {
          this._player.id = data.id;
    
          for (let c = 0; c < data.players.length; c++) {
            let player = data.players[c];
    
            this._createEnemy(player);
          }
        })
    
        this._socket.on('map_update', (data: any) => {
          //console.log("Recieved Update", data);
    
          this._updateMap(data);
        });
    
        this._socket.on('new_player', (data: any) => {
          this._newPlayer(data);
        });
    
        this._socket.on('disconnect_user', (data: any) => {
          this._removeElement(data.id);
        })
        */
    }

    private _updateMotion(dir : IDirection) {

        //console.log("on motion update: ", dir);

        let commData : ICommunication = {
                type: 'movePlayer',
                data: {
                    direction: dir
                }
            }

            this._wsServer.send(commData)


        /*
        if (this._socket != null) {
          this._player.sprite.body.vx = vx;
          this._player.sprite.body.vy = vy;
    
          this._socket.emit('update_entity', {
            id: this._player.id,
            x: this._player.sprite.position.x,
            y: this._player.sprite.position.y,
            vx: vx,
            vy: vy
          })
        }
        */
    }

    private _createEnemy(player : IPhysicsEntity) {
        let enemy = this._player.createNew();
        enemy.init(player.position.x, player.position.y, (vx : number, vy : number) => {

        }, this._newPhysics, true);

        enemy.sprite.id = player.id;
        this._enemies.push(enemy);
    }

    private _newPlayer(data : any) {
        this._createEnemy(data);
    }

    private _updateCamera() {
        //this._map.position.updatePosition();
        this._player.sprite.position.updatePosition();
        this._mapBulilder.updatePositions();
        this._background.sprite.position.updatePosition();
    }

    private _removeElement(id : number) {
        let enemyIndex = this._getElement(id);

        if (id > -1) {
            let enemy = this._enemies[enemyIndex];

            this._enemies.splice(enemyIndex, 1);

            enemy.sprite.position.x = -10000;
            enemy.sprite.destroy();
        }
    }

    private _getElement(id : number) {
        for (let c = 0; c < this._enemies.length; c++) {
            let enemy = this._enemies[c];

            if (enemy.sprite.id == id) return c;
        }

        return -1;
    }

}

export default Arena;