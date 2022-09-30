class SocketTypes {
    constructor() {

    }

    get WORLD_UPDATE(): string {
        return "world_update";
    }

    get REMOVE_PLAYER(): string {
        return "remove_player";
    }

    get CHAT_MESSAGE(): string {
        return "chat_message";
    }

    get CHAT_HISTORY(): string {
        return "chat_history";
    }

    get ADD_CONNECTION(): string {
        return "addConnection";
    }

    get MOVE_PLAYER(): string {
        return "movePlayer";
    }

    get TEST_PING(): string {
        return "test_ping";
    }

    public createNew(): SocketTypes {
        return new SocketTypes();
    }
}

export default SocketTypes;