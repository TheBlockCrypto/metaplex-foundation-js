"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAuctionHousePda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const AuctionHouseProgram_1 = require("../AuctionHouseProgram");
const findAuctionHousePda = (creator, treasuryMint, programId = AuctionHouseProgram_1.AuctionHouseProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('auction_house', 'utf8'),
        creator.toBuffer(),
        treasuryMint.toBuffer(),
    ]);
};
exports.findAuctionHousePda = findAuctionHousePda;
//# sourceMappingURL=findAuctionHousePda.js.map