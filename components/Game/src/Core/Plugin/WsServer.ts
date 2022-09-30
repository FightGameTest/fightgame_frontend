import ICommunication from "../../Common/Data/ICommunication";

class WsServer {
    private _baseUrl : string;
    private _ws : null | WebSocket;

    constructor() {
        if (window.location.hostname != "localhost" && !window.location.hostname.includes("local.fightgame")) {
            this._baseUrl = "fightgame.asia"; //use production url here
        } else {
            this._baseUrl = "localhost" + ":5000";
        }

        console.log("Base URL: ", this._baseUrl);
        
        this._ws = null;
    }

    public async startServer(onMessage : Function) : Promise<number> {
        let url = "http://" + this._baseUrl + "/join_game";

        if (!this._baseUrl.includes('localhost')) url = "https://" + this._baseUrl + "/join_game";

        return new Promise(async (resolve : Function, reject : Function) => {
            let wssUrl = await this._httpGetAsync(url);
            wssUrl = "ws://" + this._baseUrl + wssUrl;

            if (!this._baseUrl.includes('localhost')) wssUrl = wssUrl.replace("ws://", "wss://");

            //let ws: any = new WebSocket(wssUrl);

            this._ws = new WebSocket(wssUrl);

            const handShakeData = {
                type: 'addConnection',
                data: null
            };

            this._ws.addEventListener('open', (e : any) => {
                let ws : any = this._ws;

                ws.send(JSON.stringify(handShakeData));
                console.log(`Handshake done, connecting to "${wssUrl}"`);

                /*
                setTimeout(() => {
                  ws.send(JSON.stringify(moveReq));
                }, 3000)
                */
            });

            resolve(1);

            this._ws.addEventListener('message', (e : any) => {
                
                setTimeout(() => {
                    //console.log("Payload <receive>: ", JSON.parse(e.data));

                    let data = JSON.parse(e.data)
                    onMessage(data);
                }, 5);
            })
        })
    }

    public send(payload : ICommunication) {
        if (this._ws) {
            

            setTimeout(() => {
                    //console.log("Payload <send>: ", payload);
                    this._ws?.send(JSON.stringify(payload));
            }, 5);

        } else {
            console.error("Server can't send data before starting!");
        }
    }


    private async _httpGetAsync(theUrl : string) : Promise<string> {
        return new Promise((resolve : Function, reject : Function) => {
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve(xmlHttp.responseText);
            }

            xmlHttp.open("GET", theUrl, true); // true for asynchronous 
            xmlHttp.send(null);
        })
    }
}

export default WsServer;