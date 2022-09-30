import WsServer from "../../Plugin/WsServer";
import SocketTypes from "../../../Common/Data/SocketTypes";

class PingTest {
    private _wsServer : WsServer;
    private _socketTypes: SocketTypes;

    private _count: number;
    private _onceEvery: number;
    private _initDone: boolean;

    constructor(wsServer: WsServer, socketTypes: SocketTypes) {
        this._wsServer = wsServer;
        this._socketTypes = socketTypes;

        this._count = 0;
        this._onceEvery = 60 * 10;

        this._initDone = false;
    }

    public init() {
        console.log("ping test init!");
        this._initDone = true;
    }

    public test() {
        if (this._initDone) {
            if (this._count >= this._onceEvery) {
                this._count = 0;
                this._testPing();
            } else {
                this._count++;
            }
        }
    }

    private _testPing() {
        console.log("ping test being sent!");
        this._wsServer.send({
            type: this._socketTypes.TEST_PING,
            data: {
                time: Date.now()
            }
        })
    }
}

export default PingTest;