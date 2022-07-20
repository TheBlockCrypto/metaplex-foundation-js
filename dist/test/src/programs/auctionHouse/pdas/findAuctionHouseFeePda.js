"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAuctionHouseFeePda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const AuctionHouseProgram_1 = require("../AuctionHouseProgram");
const findAuctionHouseFeePda = (auctionHouse, programId = AuctionHouseProgram_1.AuctionHouseProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('auction_house', 'utf8'),
        auctionHouse.toBuffer(),
        buffer_1.Buffer.from('fee_payer', 'utf8'),
    ]);
};
exports.findAuctionHouseFeePda = findAuctionHouseFeePda;
//# sourceMappingURL=findAuctionHouseFeePda.js.map