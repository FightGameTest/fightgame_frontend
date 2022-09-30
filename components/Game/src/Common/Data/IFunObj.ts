interface IFunObj {
    function: any;
    context: any;

    init(f: Function, context: any): void;
    execute(data: any): any;
    createNew(): IFunObj;
}

export default IFunObj;