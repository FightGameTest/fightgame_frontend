import IGfxLoader from "../../Plugin/IGfxLoader";
import IDataLoader from "../../Plugin/IDataLoader";
import Resource from "../../Kernel/Data/Resource";
import EntityFactory from "../../Kernel/GameObjects/EntityFactory";

import IScene from "../../Kernel/GameObjects/IScene";
import ISceneManager from "../../Plugin/ISceneManager";
import Background from "../GameItems/Background";
import GameAPI from "../Control/GameAPI";
import Login from "../GameItems/Login";
import Button from "../GameItems/Button";

import IWeb3Wallet from "../../Plugin/IWeb3Wallet";


class Start implements IScene {
    private _gfxLoader : IGfxLoader;
    private _dataLoader : IDataLoader;
    private _resource : Resource;
    private _entityFactory : EntityFactory;
    private _sceneManager : ISceneManager;
    private _background: Background;
    private _discord: Login;
    private _gameAPI: GameAPI;
    private _wallet: IWeb3Wallet;
    private _button: Button;

    constructor(gfxLoader : IGfxLoader, dataLoader : IDataLoader, resource : Resource,
        entityFactory : EntityFactory, sceneManager : ISceneManager, background: Background, discord: Login, gameAPI: GameAPI,
        wallet: IWeb3Wallet, button: Button) {
        this._gfxLoader = gfxLoader;
        this._dataLoader = dataLoader;
        this._resource = resource;
        this._entityFactory = entityFactory;
        this._sceneManager = sceneManager;
        this._background = background;
        this._discord = discord;
        this._gameAPI = gameAPI;

        this._wallet = wallet;
        this._button = button;
    }

    public async preload() : Promise<void> {

    }

    public create() {
        console.log("Start scene is here!");

        this._background.init(0, 0, 'ui', 'entry_bg');


        //let loading = this._entityFactory.text(414, 965, "Loading", { "fontSize": 60, "fill": "white" });


        if (this._wallet.account != null) {
            console.log("Logged in, moving!");
            this._startArena();
        } else {
            console.log("Not logged in, showing login!");
            this._showLogin();
        }

    }

    public update() {
        //console.log("updating Xd");
    }

    public shutdown() {

    }

    private _startArena() {
        console.log("Wallets: ", this._wallet.findWallets());
        this._sceneManager.startScene('Arena');
    }

    private _showLogin() {
        let wallets = this._wallet.findWallets();

        this._createWalletIcons(wallets, () => {
            this._startArena();
        });
    }

    private _createWalletIcons(wallets: any[], onLogin: Function) {
        console.log("Wallet List: ", wallets);

        wallets.forEach((wallet: any, index: number) => {
            let icon = this._wallet.getWalletIcon(wallet);

            if (icon != null) {
                let walletIcon = this._button.createNew();
                walletIcon.init(50  + (200 * index), 200, () => {
                    this._wallet.connectWallet(wallet).then((data: any) => {
                        console.log("Successfully logged in!", data);

                        this._startArena();
                    })
                }, "wallets", icon);


            }

        })
    }

    private _startScene(sceneName: string) {
        this._sceneManager.startScene(sceneName);
    }

}

export default Start;