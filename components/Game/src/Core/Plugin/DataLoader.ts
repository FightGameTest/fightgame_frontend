import Resource from "../Kernel/Data/Resource";

class DataLoader {
    private _data : { resource : Resource, data : any }[];

    constructor() {
        this._data = [];
    }

    public getData(key : string) {
        for (let c = 0; c < this._data.length; c++) {
            let data = this._data[c];
            if (data.resource.name == key) {
                return data.data.data;
            }
        }

        return null;
    }

    public addResources(resList : Resource[]) {
        for (let c = 0; c < resList.length; c++) {
            let res = resList[c];
            this._data.push({ resource: res, data: null });
        }
    }

    public async download(onProgress : Function, onComplete : Function) : Promise<any> {
        return new Promise(async (resolve : Function, reject : Function) => {
            for (let c = 0; c < this._data.length; c++) {
                let data = await this._downloadFile(this._data[c].resource.url);
                this._data[c].data = data;
                onProgress(c / this._data.length);
            }

            onComplete(this._data);
            resolve(this._data);
        })
    }

    private async _downloadFile(url : string) {
        return new Promise((resolve : Function, reject : Function) => {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.response);

                    resolve({ satus: "success", data: data });
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                reject({ status: "error" })
            };

            request.send();
        });
    }
}

export default DataLoader;