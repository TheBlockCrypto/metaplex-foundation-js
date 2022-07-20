"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateAuctionHouseInstructionWithSigners = void 0;
const mpl_auction_house_1 = require("@metaplex-foundation/mpl-auction-house");
const createUpdateAuctionHouseInstructionWithSigners = (params) => {
    const { treasuryMint, payer, authority, newAuthority, feeWithdrawalDestination, treasuryWithdrawalDestination, treasuryWithdrawalDestinationOwner, auctionHouse, args, instructionKey = 'updateAuctionHouse', } = params;
    return {
        instruction: (0, mpl_auction_house_1.createUpdateAuctionHouseInstruction)({
            treasuryMint,
            payer: payer.publicKey,
            authority: authority.publicKey,
            newAuthority,
            feeWithdrawalDestination,
            treasuryWithdrawalDestination,
            treasuryWithdrawalDestinationOwner,
            auctionHouse,
        }, args),
        signers: [payer, authority],
        key: instructionKey,
    };
};
exports.createUpdateAuctionHouseInstructionWithSigners = createUpdateAuctionHouseInstructionWithSigners;
//# sourceMappingURL=createUpdateAuctionHouseInstructionWithSigners.js.map