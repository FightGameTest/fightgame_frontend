type CharData = {name: string, species: string, subspecies: string, face: string, top: string, bottom: string, back: string, righthand: string};
enum ServerResult {
    Success,
    Failure
}

import config from "../../../../../../config";



class GameAPI {
    constructor() {

    }

    public async getCharacter(): Promise<CharData> {
        const chars: CharData[] = [
                {
                    "name": "Sun",
                    "species": "Filari",
                    "subspecies": "Learned",
                    "face": "Sunglass",
                    "top": "Cheeky Unt Koala Top",
                    "bottom": "Cheeky Unt Koala Bottom",
                    "back": "Cheeky Unt Rainbow Fart",
                    "righthand": "Fishing Rod"
                },
                {
                    "name": "Moon",
                    "species": "Filari",
                    "subspecies": "Learned",
                    "face": "Sunglass",
                    "top": "Cheeky Unt Koala Top",
                    "bottom": "Cheeky Unt Koala Bottom",
                    "back": "Cheeky Unt Rainbow Fart",
                    "righthand": "Fishing Rod"
                },
                {
                    "name": "Earth",
                    "species": "Filari",
                    "subspecies": "Learned",
                    "face": "Sunglass",
                    "top": "Cheeky Unt Koala Top",
                    "bottom": "Cheeky Unt Koala Bottom",
                    "back": "Cheeky Unt Rainbow Fart",
                    "righthand": "Fishing Rod"
                }
            ]

        const i = this._randomIntFromInterval(1, chars.length);

        return new Promise((resolve: Function, reject: Function) => {
            const sndData = chars[i];

            resolve(sndData);
        })
    }


    public async isLogged(): Promise<any> {
        return new Promise(async (resolve: Function, reject: Function) => {
            resolve(true);
        })
    }


    public login(){

    }


    public async connectWallet(): Promise<ServerResult> {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(true);
        })
    }


    private _randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

export default GameAPI;