import WsServer from "../../Plugin/WsServer";
import IChatData from '../../../Common/Data/IChatData';

class ChatBot {
    constructor() {

    }

    public sendMessage(userId : number, msg : string, server : WsServer) {
        const chatData : IChatData = {
            id: userId,
            message: msg
        }

        server.send({
            type: 'chat_message',
            data: chatData
        })
    }

    public printMessage(userId : number, msg : string, playerSent : boolean) {
        if (playerSent) {
            console.log('%cYou: %c' + msg, 'color: #0096FF', 'color: #3F00FF');
        } else {
            console.log('%cPlayer' + userId + ': %c' + msg, 'color: #EE4B2B', 'color: #EC5800');
        }
    }
}

export default ChatBot;