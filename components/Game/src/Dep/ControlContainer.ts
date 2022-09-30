import SmartDepend from '../Dep/SmartDepend';

import Camera from '../Core/Game/Control/Camera';
import ChatBot from '../Core/Game/Control/ChatBot';
import GameAPI from '../Core/Game/Control/GameAPI';
import PingTest from '../Core/Game/Control/PingTest';
import SlowEvent from '../Core/Game/Control/SlowEvent';
import Background from '../Core/Game/GameItems/Background';
import Button from '../Core/Game/GameItems/Button';
import Login from '../Core/Game/GameItems/Login';
import MapBuilder from '../Core/Game/GameItems/MapBuilder';
import Player from '../Core/Game/GameItems/Player';
import Arena from '../Core/Game/Scene/Arena';
import Char from '../Core/Game/Scene/Char';
import Loading from '../Core/Game/Scene/Loading';
import Start from '../Core/Game/Scene/Start';
import Config from '../Core/Kernel/Control/Config';
import ExecTime from '../Core/Kernel/Control/ExecTime';
import Loop from '../Core/Kernel/Control/Loop';
import ParticleSystem from '../Core/Kernel/Control/ParticleSystem';
import ScaleManager from '../Core/Kernel/Control/ScaleManager';
import Resource from '../Core/Kernel/Data/Resource';
import ScaleMode from '../Core/Kernel/Data/ScaleMode';
import SceneData from '../Core/Kernel/Data/SceneData';
import Character from '../Core/Kernel/GameObjects/Character';
import Body from '../Core/Kernel/GameObjects/Component/Body';
import Display from '../Core/Kernel/GameObjects/Component/Display';
import Input from '../Core/Kernel/GameObjects/Component/Input';
import Label from '../Core/Kernel/GameObjects/Component/Label';
import Position from '../Core/Kernel/GameObjects/Component/Position';
import Scale from '../Core/Kernel/GameObjects/Component/Scale';
import CoreEntity from '../Core/Kernel/GameObjects/CoreEntity';
import EntityFactory from '../Core/Kernel/GameObjects/EntityFactory';
import Spine from '../Core/Kernel/GameObjects/Spine';
import Sprite from '../Core/Kernel/GameObjects/Sprite';
import Text from '../Core/Kernel/GameObjects/Text';
import NoireLibre from '../Core/NoireLibre';
import AbstractGameObject from '../Core/Plugin/AbstractGameObject';
import DataLoader from '../Core/Plugin/DataLoader';
import GfxLoader from '../Core/Plugin/GfxLoader';
import PixiCustomSprite from '../Core/Plugin/Pixi/PixiCustomSprite';
import PixiLayer from '../Core/Plugin/Pixi/PixiLayer';
import PxPoint from '../Core/Plugin/Pixi/PxPoint';
import PxText from '../Core/Plugin/Pixi/PxText';
import BridgeConfig from '../Core/Plugin/React/BridgeConfig';
import ReactBridge from '../Core/Plugin/React/ReactBridge';
import SceneManager from '../Core/Plugin/SceneManager';
import Screen from '../Core/Plugin/Screen';
import TweenJs from '../Core/Plugin/TweenJs';
import WsServer from '../Core/Plugin/WsServer';
import Web3Wallet from '../Core/Plugin/web3-wallets/Web3Wallets';
import NewPhysics from '../Common/Brain/NewPhysics';
import TimedStorage from '../Common/Brain/TimedStorage';
import AnimationDir from '../Common/Data/AnimationDir';
import CommonConfig from '../Common/Data/CommonConfig';
import FunObj from '../Common/Data/FunObj';
import SocketTypes from '../Common/Data/SocketTypes';




class ControlContainer {
  private _smartDepend: SmartDepend;

  protected _Camera: any;
protected _ChatBot: any;
protected _GameAPI: any;
protected _PingTest: any;
protected _SlowEvent: any;
protected _Background: any;
protected _Button: any;
protected _Login: any;
protected _MapBuilder: any;
protected _Player: any;
protected _Arena: any;
protected _Char: any;
protected _Loading: any;
protected _Start: any;
protected _Config: any;
protected _ExecTime: any;
protected _Loop: any;
protected _ParticleSystem: any;
protected _ScaleManager: any;
protected _Resource: any;
protected _ScaleMode: any;
protected _SceneData: any;
protected _Character: any;
protected _Body: any;
protected _Display: any;
protected _Input: any;
protected _Label: any;
protected _Position: any;
protected _Scale: any;
protected _CoreEntity: any;
protected _EntityFactory: any;
protected _Spine: any;
protected _Sprite: any;
protected _Text: any;
protected _NoireLibre: any;
protected _AbstractGameObject: any;
protected _DataLoader: any;
protected _GfxLoader: any;
protected _PixiCustomSprite: any;
protected _PixiLayer: any;
protected _PxPoint: any;
protected _PxText: any;
protected _BridgeConfig: any;
protected _ReactBridge: any;
protected _SceneManager: any;
protected _Screen: any;
protected _TweenJs: any;
protected _WsServer: any;
protected _Web3Wallet: any;
protected _NewPhysics: any;
protected _TimedStorage: any;
protected _AnimationDir: any;
protected _CommonConfig: any;
protected _FunObj: any;
protected _SocketTypes: any;


  constructor(globalState: any = null) {
    this._smartDepend = new SmartDepend(globalState);

    this._addModules();
    this._addDepends();
  }

  public getMain(): NoireLibre {
    let spEntity = <NoireLibre>this._smartDepend.resolve(this._NoireLibre);

    return spEntity;
  }

  private _addModules() {
    this._Camera = this._smartDepend.addModule(Camera, true);
this._ChatBot = this._smartDepend.addModule(ChatBot, false);
this._GameAPI = this._smartDepend.addModule(GameAPI, false);
this._PingTest = this._smartDepend.addModule(PingTest, false);
this._SlowEvent = this._smartDepend.addModule(SlowEvent, false);
this._Background = this._smartDepend.addModule(Background, false);
this._Button = this._smartDepend.addModule(Button, false);
this._Login = this._smartDepend.addModule(Login, false);
this._MapBuilder = this._smartDepend.addModule(MapBuilder, false);
this._Player = this._smartDepend.addModule(Player, false);
this._Arena = this._smartDepend.addModule(Arena, false);
this._Char = this._smartDepend.addModule(Char, false);
this._Loading = this._smartDepend.addModule(Loading, false);
this._Start = this._smartDepend.addModule(Start, false);
this._Config = this._smartDepend.addModule(Config, false);
this._ExecTime = this._smartDepend.addModule(ExecTime, false);
this._Loop = this._smartDepend.addModule(Loop, true);
this._ParticleSystem = this._smartDepend.addModule(ParticleSystem, false);
this._ScaleManager = this._smartDepend.addModule(ScaleManager, true);
this._Resource = this._smartDepend.addModule(Resource, false);
this._ScaleMode = this._smartDepend.addModule(ScaleMode, false);
this._SceneData = this._smartDepend.addModule(SceneData, false);
this._Character = this._smartDepend.addModule(Character, false);
this._Body = this._smartDepend.addModule(Body, false);
this._Display = this._smartDepend.addModule(Display, false);
this._Input = this._smartDepend.addModule(Input, false);
this._Label = this._smartDepend.addModule(Label, false);
this._Position = this._smartDepend.addModule(Position, false);
this._Scale = this._smartDepend.addModule(Scale, false);
this._CoreEntity = this._smartDepend.addModule(CoreEntity, false);
this._EntityFactory = this._smartDepend.addModule(EntityFactory, false);
this._Spine = this._smartDepend.addModule(Spine, false);
this._Sprite = this._smartDepend.addModule(Sprite, false);
this._Text = this._smartDepend.addModule(Text, false);
this._NoireLibre = this._smartDepend.addModule(NoireLibre, false);
this._AbstractGameObject = this._smartDepend.addModule(AbstractGameObject, false);
this._DataLoader = this._smartDepend.addModule(DataLoader, true);
this._GfxLoader = this._smartDepend.addModule(GfxLoader, false);
this._PixiCustomSprite = this._smartDepend.addModule(PixiCustomSprite, false);
this._PixiLayer = this._smartDepend.addModule(PixiLayer, true);
this._PxPoint = this._smartDepend.addModule(PxPoint, false);
this._PxText = this._smartDepend.addModule(PxText, false);
this._BridgeConfig = this._smartDepend.addModule(BridgeConfig, false);
this._ReactBridge = this._smartDepend.addModule(ReactBridge, true);
this._SceneManager = this._smartDepend.addModule(SceneManager, true);
this._Screen = this._smartDepend.addModule(Screen, false);
this._TweenJs = this._smartDepend.addModule(TweenJs, false);
this._WsServer = this._smartDepend.addModule(WsServer, true);
this._Web3Wallet = this._smartDepend.addModule(Web3Wallet, false);
this._NewPhysics = this._smartDepend.addModule(NewPhysics, false);
this._TimedStorage = this._smartDepend.addModule(TimedStorage, false);
this._AnimationDir = this._smartDepend.addModule(AnimationDir, false);
this._CommonConfig = this._smartDepend.addModule(CommonConfig, false);
this._FunObj = this._smartDepend.addModule(FunObj, false);
this._SocketTypes = this._smartDepend.addModule(SocketTypes, false);

  }

  private _addDepends() {
    this._smartDepend.addDependency(this._PingTest, this._WsServer);
this._smartDepend.addDependency(this._PingTest, this._SocketTypes);


this._smartDepend.addDependency(this._Background, this._EntityFactory);
this._smartDepend.addDependency(this._Background, this._Sprite);


this._smartDepend.addDependency(this._Button, this._EntityFactory);
this._smartDepend.addDependency(this._Button, this._Sprite);


this._smartDepend.addDependency(this._Login, this._EntityFactory);
this._smartDepend.addDependency(this._Login, this._Sprite);


this._smartDepend.addDependency(this._MapBuilder, this._EntityFactory);


this._smartDepend.addDependency(this._Player, this._EntityFactory);
this._smartDepend.addDependency(this._Player, this._Character);
this._smartDepend.addDependency(this._Player, this._Screen);
this._smartDepend.addDependency(this._Player, this._Config);
this._smartDepend.addDependency(this._Player, this._AnimationDir);
this._smartDepend.addDependency(this._Player, this._TimedStorage);
this._smartDepend.addDependency(this._Player, this._TimedStorage);
this._smartDepend.addDependency(this._Player, this._BridgeConfig);
this._smartDepend.addDependency(this._Player, this._ReactBridge);


this._smartDepend.addDependency(this._Arena, this._GfxLoader);
this._smartDepend.addDependency(this._Arena, this._DataLoader);
this._smartDepend.addDependency(this._Arena, this._Resource);
this._smartDepend.addDependency(this._Arena, this._EntityFactory);
this._smartDepend.addDependency(this._Arena, this._SceneManager);
this._smartDepend.addDependency(this._Arena, this._Sprite);
this._smartDepend.addDependency(this._Arena, this._Text);
this._smartDepend.addDependency(this._Arena, this._Camera);
this._smartDepend.addDependency(this._Arena, this._Player);
this._smartDepend.addDependency(this._Arena, this._Config);
this._smartDepend.addDependency(this._Arena, this._SlowEvent);
this._smartDepend.addDependency(this._Arena, this._MapBuilder);
this._smartDepend.addDependency(this._Arena, this._WsServer);
this._smartDepend.addDependency(this._Arena, this._ChatBot);
this._smartDepend.addDependency(this._Arena, this._Background);
this._smartDepend.addDependency(this._Arena, this._NewPhysics);
this._smartDepend.addDependency(this._Arena, this._PingTest);
this._smartDepend.addDependency(this._Arena, this._SocketTypes);
this._smartDepend.addDependency(this._Arena, this._Character);
this._smartDepend.addDependency(this._Arena, this._GameAPI);
this._smartDepend.addDependency(this._Arena, this._BridgeConfig);
this._smartDepend.addDependency(this._Arena, this._ReactBridge);


this._smartDepend.addDependency(this._Char, this._GfxLoader);
this._smartDepend.addDependency(this._Char, this._DataLoader);
this._smartDepend.addDependency(this._Char, this._Resource);
this._smartDepend.addDependency(this._Char, this._EntityFactory);
this._smartDepend.addDependency(this._Char, this._SceneManager);
this._smartDepend.addDependency(this._Char, this._BridgeConfig);
this._smartDepend.addDependency(this._Char, this._ReactBridge);


this._smartDepend.addDependency(this._Loading, this._GfxLoader);
this._smartDepend.addDependency(this._Loading, this._DataLoader);
this._smartDepend.addDependency(this._Loading, this._Resource);
this._smartDepend.addDependency(this._Loading, this._EntityFactory);
this._smartDepend.addDependency(this._Loading, this._SceneManager);


this._smartDepend.addDependency(this._Start, this._GfxLoader);
this._smartDepend.addDependency(this._Start, this._DataLoader);
this._smartDepend.addDependency(this._Start, this._Resource);
this._smartDepend.addDependency(this._Start, this._EntityFactory);
this._smartDepend.addDependency(this._Start, this._SceneManager);
this._smartDepend.addDependency(this._Start, this._Background);
this._smartDepend.addDependency(this._Start, this._Login);
this._smartDepend.addDependency(this._Start, this._GameAPI);
this._smartDepend.addDependency(this._Start, this._Web3Wallet);
this._smartDepend.addDependency(this._Start, this._Button);


this._smartDepend.addDependency(this._Loop, this._FunObj);


this._smartDepend.addDependency(this._ParticleSystem, this._EntityFactory);


this._smartDepend.addDependency(this._Character, this._Position);
this._smartDepend.addDependency(this._Character, this._Display);
this._smartDepend.addDependency(this._Character, this._Input);
this._smartDepend.addDependency(this._Character, this._ScaleManager);
this._smartDepend.addDependency(this._Character, this._AbstractGameObject);
this._smartDepend.addDependency(this._Character, this._Screen);
this._smartDepend.addDependency(this._Character, this._SceneManager);


this._smartDepend.addDependency(this._Body, this._AbstractGameObject);


this._smartDepend.addDependency(this._Display, this._AbstractGameObject);
this._smartDepend.addDependency(this._Display, this._Scale);
this._smartDepend.addDependency(this._Display, this._Screen);


this._smartDepend.addDependency(this._Input, this._AbstractGameObject);


this._smartDepend.addDependency(this._Label, this._AbstractGameObject);


this._smartDepend.addDependency(this._Position, this._AbstractGameObject);
this._smartDepend.addDependency(this._Position, this._Scale);
this._smartDepend.addDependency(this._Position, this._Camera);
this._smartDepend.addDependency(this._Position, this._Screen);


this._smartDepend.addDependency(this._Scale, this._Config);
this._smartDepend.addDependency(this._Scale, this._ScaleMode);
this._smartDepend.addDependency(this._Scale, this._AbstractGameObject);


this._smartDepend.addDependency(this._CoreEntity, this._Screen);
this._smartDepend.addDependency(this._CoreEntity, this._Position);
this._smartDepend.addDependency(this._CoreEntity, this._Display);
this._smartDepend.addDependency(this._CoreEntity, this._Input);
this._smartDepend.addDependency(this._CoreEntity, this._AbstractGameObject);
this._smartDepend.addDependency(this._CoreEntity, this._ScaleManager);


this._smartDepend.addDependency(this._EntityFactory, this._Sprite);
this._smartDepend.addDependency(this._EntityFactory, this._Spine);
this._smartDepend.addDependency(this._EntityFactory, this._Text);
this._smartDepend.addDependency(this._EntityFactory, this._TweenJs);
this._smartDepend.addDependency(this._EntityFactory, this._Character);


this._smartDepend.addDependency(this._Spine, this._Position);
this._smartDepend.addDependency(this._Spine, this._Display);
this._smartDepend.addDependency(this._Spine, this._Input);
this._smartDepend.addDependency(this._Spine, this._ScaleManager);
this._smartDepend.addDependency(this._Spine, this._AbstractGameObject);
this._smartDepend.addDependency(this._Spine, this._Screen);
this._smartDepend.addDependency(this._Spine, this._SceneManager);


this._smartDepend.addDependency(this._Sprite, this._Position);
this._smartDepend.addDependency(this._Sprite, this._Display);
this._smartDepend.addDependency(this._Sprite, this._Input);
this._smartDepend.addDependency(this._Sprite, this._ScaleManager);
this._smartDepend.addDependency(this._Sprite, this._AbstractGameObject);
this._smartDepend.addDependency(this._Sprite, this._Screen);
this._smartDepend.addDependency(this._Sprite, this._SceneManager);


this._smartDepend.addDependency(this._Text, this._Position);
this._smartDepend.addDependency(this._Text, this._Display);
this._smartDepend.addDependency(this._Text, this._Input);
this._smartDepend.addDependency(this._Text, this._Label);
this._smartDepend.addDependency(this._Text, this._AbstractGameObject);
this._smartDepend.addDependency(this._Text, this._Screen);
this._smartDepend.addDependency(this._Text, this._SceneManager);
this._smartDepend.addDependency(this._Text, this._ScaleManager);


this._smartDepend.addDependency(this._NoireLibre, this._Config);
this._smartDepend.addDependency(this._NoireLibre, this._Loop);
this._smartDepend.addDependency(this._NoireLibre, this._Screen);
this._smartDepend.addDependency(this._NoireLibre, this._SceneManager);
this._smartDepend.addDependency(this._NoireLibre, this._Loading);
this._smartDepend.addDependency(this._NoireLibre, this._Arena);
this._smartDepend.addDependency(this._NoireLibre, this._Char);
this._smartDepend.addDependency(this._NoireLibre, this._Start);


this._smartDepend.addDependency(this._GfxLoader, this._PixiLayer);


this._smartDepend.addDependency(this._PixiLayer, this._PxText);


this._smartDepend.addDependency(this._PxText, this._PxPoint);


this._smartDepend.addDependency(this._SceneManager, this._PixiLayer);
this._smartDepend.addDependency(this._SceneManager, this._SceneData);
this._smartDepend.addDependency(this._SceneManager, this._Loop);
this._smartDepend.addDependency(this._SceneManager, this._ScaleManager);


this._smartDepend.addDependency(this._Screen, this._PixiLayer);



  }

}

export default ControlContainer;
