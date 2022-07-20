"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAuctionHouseTreasuryPda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const AuctionHouseProgram_1 = require("../AuctionHouseProgram");
const findAuctionHouseTreasuryPda = (auctionHouse, programId = AuctionHouseProgram_1.AuctionHouseProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('auction_house', 'utf8'),
        auctionHouse.toBuffer(),
        buffer_1.Buffer.from('treasury', 'utf8'),
    ]);
};
exports.findAuctionHouseTreasuryPda = findAuctionHouseTreasuryPda;
//# sourceMappingURL=findAuctionHouseTreasuryPda.js.map