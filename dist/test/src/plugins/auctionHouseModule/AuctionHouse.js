"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionHouse = void 0;
const types_1 = require("../../types");
const constants_1 = require("./constants");
class AuctionHouse extends types_1.Model {
    constructor(account) {
        super();
        this.address = new types_1.Pda(account.publicKey, account.data.bump);
        this.creator = account.data.creator;
        this.authority = account.data.authority;
        this.treasuryMint = account.data.treasuryMint;
        this.feeAccount = new types_1.Pda(account.data.auctionHouseFeeAccount, account.data.feePayerBump);
        this.treasuryAccount = new types_1.Pda(account.data.auctionHouseTreasury, account.data.treasuryBump);
        this.feeWithdrawalDestination = account.data.feeWithdrawalDestination;
        this.treasuryWithdrawalDestination =
            account.data.treasuryWithdrawalDestination;
        this.sellerFeeBasisPoints = account.data.sellerFeeBasisPoints;
        this.requiresSignOff = account.data.requiresSignOff;
        this.canChangeSalePrice = account.data.canChangeSalePrice;
    }
    usesSol() {
        return this.treasuryMint.equals(constants_1.WRAPPED_SOL_MINT);
    }
}
exports.AuctionHouse = AuctionHouse;
//# sourceMappingURL=AuctionHouse.js.map