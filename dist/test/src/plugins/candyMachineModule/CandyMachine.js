"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandyMachine = void 0;
const types_1 = require("../../types");
const candyMachineInternals_1 = require("../../programs/candyMachine/accounts/candyMachineInternals");
class CandyMachine extends types_1.Model {
    constructor(candyMachineAccount, rawData) {
        var _a, _b, _c, _d, _e, _f;
        super();
        this.candyMachineAccount = candyMachineAccount;
        this.rawData = rawData;
        // CandyMachine inner Data
        const accountData = candyMachineAccount.data;
        this.uuid = accountData.data.uuid;
        this.price = accountData.data.price;
        this.symbol = accountData.data.symbol;
        this.sellerFeeBasisPoints = accountData.data.sellerFeeBasisPoints;
        this.maxSupply = accountData.data.maxSupply;
        this.isMutable = accountData.data.isMutable;
        this.retainAuthority = accountData.data.retainAuthority;
        this.goLiveDate = (_a = accountData.data.goLiveDate) !== null && _a !== void 0 ? _a : undefined;
        this.itemsAvailable = accountData.data.itemsAvailable;
        this.endSettings = (_b = accountData.data.endSettings) !== null && _b !== void 0 ? _b : undefined;
        this.hiddenSettings = (_c = accountData.data.hiddenSettings) !== null && _c !== void 0 ? _c : undefined;
        this.whitelistMintSettings =
            (_d = accountData.data.whitelistMintSettings) !== null && _d !== void 0 ? _d : undefined;
        this.gatekeeper = (_e = accountData.data.gatekeeper) !== null && _e !== void 0 ? _e : undefined;
        this.creators = accountData.data.creators;
        // CandyMachine Data
        this.itemsRedeemed = accountData.itemsRedeemed;
        // CandyMachine Addresses
        this.authorityAddress = accountData.authority;
        this.walletAddress = accountData.wallet;
        this.tokenMintAddress = (_f = accountData.tokenMint) !== null && _f !== void 0 ? _f : undefined;
        this.candyMachineAddress = candyMachineAccount.publicKey;
    }
    get assetsCount() {
        return (0, candyMachineInternals_1.getConfigLinesCount)(this.rawData);
    }
    get assets() {
        return (0, candyMachineInternals_1.getConfigLines)(this.rawData);
    }
    get isFull() {
        return this.assetsCount >= this.maxSupply;
    }
    get candyMachineData() {
        var _a, _b, _c, _d, _e;
        return {
            uuid: this.uuid,
            price: this.price,
            symbol: this.symbol,
            sellerFeeBasisPoints: this.sellerFeeBasisPoints,
            maxSupply: this.maxSupply,
            isMutable: this.isMutable,
            retainAuthority: this.retainAuthority,
            goLiveDate: (_a = this.goLiveDate) !== null && _a !== void 0 ? _a : null,
            itemsAvailable: this.itemsAvailable,
            endSettings: (_b = this.endSettings) !== null && _b !== void 0 ? _b : null,
            hiddenSettings: (_c = this.hiddenSettings) !== null && _c !== void 0 ? _c : null,
            whitelistMintSettings: (_d = this.whitelistMintSettings) !== null && _d !== void 0 ? _d : null,
            gatekeeper: (_e = this.gatekeeper) !== null && _e !== void 0 ? _e : null,
            creators: this.creators,
        };
    }
    updatedCandyMachineData(update) {
        const candyUpdate = Object.entries(update).reduce((acc, [key, value]) => {
            if (this.candyMachineData.hasOwnProperty(key)) {
                acc[key] = value;
            }
            return acc;
        }, {});
        return Object.assign(Object.assign({}, this.candyMachineData), candyUpdate);
    }
    static fromAccount(candyMachineAccount, rawData) {
        return new CandyMachine(candyMachineAccount, rawData);
    }
}
exports.CandyMachine = CandyMachine;
//# sourceMappingURL=CandyMachine.js.map