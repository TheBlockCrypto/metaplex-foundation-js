"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreateAuctionHouseInstructionWithSigners = void 0;
const mpl_auction_house_1 = require("@metaplex-foundation/mpl-auction-house");
const createCreateAuctionHouseInstructionWithSigners = (params) => {
    const { treasuryMint, payer, authority, feeWithdrawalDestination, treasuryWithdrawalDestination, treasuryWithdrawalDestinationOwner, auctionHouse, auctionHouseFeeAccount, auctionHouseTreasury, args, instructionKey = 'createAuctionHouse', } = params;
    return {
        instruction: (0, mpl_auction_house_1.createCreateAuctionHouseInstruction)({
            treasuryMint,
            payer: payer.publicKey,
            authority,
            feeWithdrawalDestination,
            treasuryWithdrawalDestination,
            treasuryWithdrawalDestinationOwner,
            auctionHouse,
            auctionHouseFeeAccount,
            auctionHouseTreasury,
        }, args),
        signers: [payer],
        key: instructionKey,
    };
};
exports.createCreateAuctionHouseInstructionWithSigners = createCreateAuctionHouseInstructionWithSigners;
//# sourceMappingURL=createCreateAuctionHouseInstructionWithSigners.js.map