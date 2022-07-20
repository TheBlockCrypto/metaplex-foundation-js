"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const spok_1 = __importDefault(require("spok"));
const helpers_1 = require("../../helpers");
const constants_1 = require("../../../src/plugins/auctionHouseModule/constants");
const programs_1 = require("../../../src/programs");
const web3_js_1 = require("@solana/web3.js");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('[auctionHouseModule] update all fields of an Auction House', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And an existing Auction House.
    const { auctionHouse: originalAuctionHouse } = yield mx
        .auctions()
        .createAuctionHouse({ sellerFeeBasisPoints: 200 })
        .run();
    const originalCreator = mx.identity().publicKey;
    const originalMint = constants_1.WRAPPED_SOL_MINT;
    const originalAddress = (0, programs_1.findAuctionHousePda)(originalCreator, originalMint);
    (0, spok_1.default)(t, originalAuctionHouse, {
        $topic: 'Original AuctionHouse',
        address: (0, helpers_1.spokSamePubkey)(originalAddress),
        creator: (0, helpers_1.spokSamePubkey)(originalCreator),
        authority: (0, helpers_1.spokSamePubkey)(originalCreator),
        treasuryMint: (0, helpers_1.spokSamePubkey)(originalMint),
        feeAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseFeePda)(originalAddress)),
        treasuryAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseTreasuryPda)(originalAddress)),
        feeWithdrawalDestination: (0, helpers_1.spokSamePubkey)(originalCreator),
        treasuryWithdrawalDestination: (0, helpers_1.spokSamePubkey)(originalCreator),
        sellerFeeBasisPoints: 200,
        requiresSignOff: false,
        canChangeSalePrice: false,
    });
    // When we update as much as we can from that Auction House.
    const newAuthority = web3_js_1.Keypair.generate().publicKey;
    const newFeeWithdrawalDestination = web3_js_1.Keypair.generate().publicKey;
    const newTreasuryWithdrawalDestinationOwner = web3_js_1.Keypair.generate().publicKey;
    const { auctionHouse: updatedAuctionHouse } = yield mx
        .auctions()
        .updateAuctionHouse(originalAuctionHouse, {
        sellerFeeBasisPoints: 300,
        requiresSignOff: true,
        canChangeSalePrice: true,
        newAuthority,
        feeWithdrawalDestination: newFeeWithdrawalDestination,
        treasuryWithdrawalDestinationOwner: newTreasuryWithdrawalDestinationOwner,
    })
        .run();
    // Then all changes have been correctly applied.
    (0, spok_1.default)(t, updatedAuctionHouse, {
        $topic: 'Updated AuctionHouse',
        address: (0, helpers_1.spokSamePubkey)(originalAddress),
        creator: (0, helpers_1.spokSamePubkey)(originalCreator),
        authority: (0, helpers_1.spokSamePubkey)(newAuthority),
        // TODO(loris): Update this to a different mint when we have helper methods or a Token module.
        treasuryMint: (0, helpers_1.spokSamePubkey)(originalMint),
        feeAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseFeePda)(originalAddress)),
        treasuryAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseTreasuryPda)(originalAddress)),
        feeWithdrawalDestination: (0, helpers_1.spokSamePubkey)(newFeeWithdrawalDestination),
        treasuryWithdrawalDestination: (0, helpers_1.spokSamePubkey)(newTreasuryWithdrawalDestinationOwner),
        sellerFeeBasisPoints: 300,
        requiresSignOff: true,
        canChangeSalePrice: true,
    });
}));
(0, tape_1.default)('[auctionHouseModule] providing no changes updates nothing on the Auction House', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And an existing Auction House.
    const { auctionHouse: originalAuctionHouse } = yield mx
        .auctions()
        .createAuctionHouse({ sellerFeeBasisPoints: 200 })
        .run();
    // When we update the Auction House with no changes.
    const { auctionHouse: updatedAuctionHouse } = yield mx
        .auctions()
        .updateAuctionHouse(originalAuctionHouse, {})
        .run();
    // Then all original fields were left unchanged.
    const originalCreator = mx.identity().publicKey;
    const originalMint = constants_1.WRAPPED_SOL_MINT;
    const originalAddress = (0, programs_1.findAuctionHousePda)(originalCreator, originalMint);
    (0, spok_1.default)(t, updatedAuctionHouse, {
        $topic: 'Non Updated AuctionHouse',
        address: (0, helpers_1.spokSamePubkey)(originalAddress),
        creator: (0, helpers_1.spokSamePubkey)(originalCreator),
        authority: (0, helpers_1.spokSamePubkey)(originalCreator),
        treasuryMint: (0, helpers_1.spokSamePubkey)(originalMint),
        feeAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseFeePda)(originalAddress)),
        treasuryAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseTreasuryPda)(originalAddress)),
        feeWithdrawalDestination: (0, helpers_1.spokSamePubkey)(originalCreator),
        treasuryWithdrawalDestination: (0, helpers_1.spokSamePubkey)(originalCreator),
        sellerFeeBasisPoints: 200,
        requiresSignOff: false,
        canChangeSalePrice: false,
    });
}));
//# sourceMappingURL=updateAuctionHouse.test.js.map