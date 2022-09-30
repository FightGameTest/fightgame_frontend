import IWeb3Wallet from "../IWeb3Wallet";
import { getWallets, wallets } from "@depay/web3-wallets"



class Web3Wallet implements IWeb3Wallet {
    private _account: any | null;

    constructor() {
        this._account = null;
    }

    get account() {
        return this._account;
    }

    getWalletIcon(wallet: any) {
        if (wallet.name == "MetaMask") {
            return "metamask";
        } else if (wallet.name == "Phantom") {
            return "phantom";
        } else {
            return null;
        }
    }


    findWallets() {
        return getWallets();
    }

    async connectWallet(wallet: any) {
        await wallet.connect();
        this._account = wallet;

        return wallet;
    }
}

export default Web3Wallet;