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
(0, tape_1.default)('[auctionHouseModule] create new Auction House with minimum configuration', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // When we create a new Auction House with minimum configuration.
    const { auctionHouse } = yield mx
        .auctions()
        .createAuctionHouse({ sellerFeeBasisPoints: 200 })
        .run();
    // Then we created and returned the new Auction House and it has appropriate defaults.
    const expectedCreator = mx.identity().publicKey;
    const expectedMint = constants_1.WRAPPED_SOL_MINT;
    const expectedAddress = (0, programs_1.findAuctionHousePda)(expectedCreator, expectedMint);
    const expectedAuctionHouse = {
        address: (0, helpers_1.spokSamePubkey)(expectedAddress),
        creator: (0, helpers_1.spokSamePubkey)(expectedCreator),
        authority: (0, helpers_1.spokSamePubkey)(expectedCreator),
        treasuryMint: (0, helpers_1.spokSamePubkey)(expectedMint),
        feeAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseFeePda)(expectedAddress)),
        treasuryAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseTreasuryPda)(expectedAddress)),
        feeWithdrawalDestination: (0, helpers_1.spokSamePubkey)(expectedCreator),
        treasuryWithdrawalDestination: (0, helpers_1.spokSamePubkey)(expectedCreator),
        sellerFeeBasisPoints: 200,
        requiresSignOff: false,
        canChangeSalePrice: false,
    };
    (0, spok_1.default)(t, auctionHouse, Object.assign({ $topic: 'AuctionHouse' }, expectedAuctionHouse));
    // And we get the same result when we fetch the Auction House by address.
    const retrievedAuctionHouse = yield mx
        .auctions()
        .findAuctionHouseByAddress(auctionHouse.address)
        .run();
    (0, spok_1.default)(t, retrievedAuctionHouse, Object.assign({ $topic: 'Retrieved AuctionHouse' }, expectedAuctionHouse));
}));
(0, tape_1.default)('[auctionHouseModule] create new Auction House with maximum configuration', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // When we create a new Auction House by providing all inputs.
    const treasuryMint = constants_1.WRAPPED_SOL_MINT;
    const authority = mx.identity();
    const feeWithdrawalDestination = web3_js_1.Keypair.generate();
    const treasuryWithdrawalDestinationOwner = web3_js_1.Keypair.generate();
    const { auctionHouse } = yield mx
        .auctions()
        .createAuctionHouse({
        sellerFeeBasisPoints: 200,
        requiresSignOff: true,
        canChangeSalePrice: true,
        treasuryMint: treasuryMint,
        payer: authority,
        authority: authority.publicKey,
        feeWithdrawalDestination: feeWithdrawalDestination.publicKey,
        treasuryWithdrawalDestinationOwner: treasuryWithdrawalDestinationOwner.publicKey,
    })
        .run();
    // Then the created Auction House has the expected configuration.
    const expectedAddress = (0, programs_1.findAuctionHousePda)(authority.publicKey, treasuryMint);
    const expectedAuctionHouse = {
        address: (0, helpers_1.spokSamePubkey)(expectedAddress),
        creator: (0, helpers_1.spokSamePubkey)(authority.publicKey),
        authority: (0, helpers_1.spokSamePubkey)(authority.publicKey),
        treasuryMint: (0, helpers_1.spokSamePubkey)(treasuryMint),
        feeAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseFeePda)(expectedAddress)),
        treasuryAccount: (0, helpers_1.spokSamePubkey)((0, programs_1.findAuctionHouseTreasuryPda)(expectedAddress)),
        feeWithdrawalDestination: (0, helpers_1.spokSamePubkey)(feeWithdrawalDestination.publicKey),
        treasuryWithdrawalDestination: (0, helpers_1.spokSamePubkey)(treasuryWithdrawalDestinationOwner.publicKey),
        sellerFeeBasisPoints: 200,
        requiresSignOff: true,
        canChangeSalePrice: true,
    };
    (0, spok_1.default)(t, auctionHouse, Object.assign({ $topic: 'AuctionHouse' }, expectedAuctionHouse));
}));
//# sourceMappingURL=createAuctionHouse.test.js.map