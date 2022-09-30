import Config from './Kernel/Control/Config';
import Loop from './Kernel/Control/Loop';
import IScreen from './Plugin/IScreen';
import ISceneManager from './Plugin/ISceneManager';

import Loading from './Game/Scene/Loading';
import Arena from './Game/Scene/Arena';
import Char from './Game/Scene/Char';
import Start from './Game/Scene/Start';

class NoireLibre {
    private _config : Config;
    private _loop : Loop;
    private _screen : IScreen;
    private _sceneManager : ISceneManager;

    private _loading : Loading;
    private _arena : Arena;
    private _char: Char;
    private _start: Start;


    constructor(config : Config, loop : Loop, screen : IScreen, sceneManager : ISceneManager,
        loading : Loading, arena : Arena, char: Char, start: Start) {
        this._config = config;
        this._loop = loop;
        this._screen = screen;
        this._sceneManager = sceneManager;

        this._loading = loading;
        this._arena = arena;
        this._char = char;
        this._start = start;
    }

    public startGame() {
        this._screen.startRenderer(document.documentElement.clientWidth, document.documentElement.clientHeight, true, false);

        this._startLoop();
        this._initScenes();
        this._startFirstScene();
    }

    private _startLoop() {
        this._loop.start();
    }

    private _initScenes() {
        this._sceneManager.init();

        this._sceneManager.addScene('Loading', this._loading);
        this._sceneManager.addScene('Arena', this._arena);
        this._sceneManager.addScene('Char', this._char);
        this._sceneManager.addScene('Start', this._start);
    }

    private _startFirstScene() {
        this._sceneManager.startScene('Loading');
    }

}

export default NoireLibre;