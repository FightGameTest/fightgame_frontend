import IGfxLoader from "../../Plugin/IGfxLoader";
import IDataLoader from "../../Plugin/IDataLoader";
import Resource from "../../Kernel/Data/Resource";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";

import IScene from "../../Kernel/GameObjects/IScene";
import ISceneManager from "../../Plugin/ISceneManager";
import BridgeConfig from "../../Plugin/React/BridgeConfig";
import ReactBridge from "../../Plugin/React/ReactBridge";


class Char implements IScene {
    private _gfxLoader : IGfxLoader;
    private _dataLoader : IDataLoader;
    private _resource : Resource;
    private _entityFactory : EntityFactory;
    private _sceneManager : ISceneManager;

    private _bridgeConfig: BridgeConfig;
    private _reactBridge: ReactBridge;

    constructor(gfxLoader : IGfxLoader, dataLoader : IDataLoader, resource : Resource,
        entityFactory : EntityFactory, sceneManager : ISceneManager, bridgeConfig: BridgeConfig, reactBridge: ReactBridge) {
        this._gfxLoader = gfxLoader;
        this._dataLoader = dataLoader;
        this._resource = resource;
        this._entityFactory = entityFactory;
        this._sceneManager = sceneManager;

        this._bridgeConfig = bridgeConfig;
        this._reactBridge = reactBridge;
    }

    public async preload() : Promise<void> {
        
    }

    public create() {
        this._reactBridge.forceAvailableGlobal();
        console.log("Welcome to the Char room");


        this._reactBridge.addEntry(this._bridgeConfig.CHARSCN_NEXTSCENE, () => {
            this._startScene("Arena");
        }, this);


        this._reactBridge.execute(this._bridgeConfig.CHAR_SHOWWINDOW, true);
    }

    public update() {
        //console.log("updating Xd");
    }

    public shutdown() {

    }

    private _startScene(sceneName: string) {
        this._sceneManager.startScene(sceneName);
    }

}

export default Char;