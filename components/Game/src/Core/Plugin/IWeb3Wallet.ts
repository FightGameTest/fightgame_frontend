interface IWeb3Wallet {
    account: any;

    findWallets(): any[];
    connectWallet(wallet: any): Promise<any>;
    getWalletIcon(wallet: any): string | null;

}

export default IWeb3Wallet;