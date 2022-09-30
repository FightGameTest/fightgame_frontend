import * as PIXI from "pixi.js"
import type { Dict } from '@pixi/utils';

import Resource from "../Kernel/Data/Resource";

interface IDataLoader {
    getData(key : string) : any;
    addResources(resList : Resource[]) : void;
    download(onProgress : Function, onComplete : Function) : Promise<any>;
}

export default IDataLoader;