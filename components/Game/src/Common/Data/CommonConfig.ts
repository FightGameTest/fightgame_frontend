import ICommonConfig from "./ICommonConfig";

class CommonConfig implements ICommonConfig {
    constructor() {

    }

    get speed() {
        return 2;
    }

    public createNew(): ICommonConfig {
        return new CommonConfig();
    }
}

export default CommonConfig;