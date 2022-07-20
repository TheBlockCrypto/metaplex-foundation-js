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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuctionHouseBuilder = exports.createAuctionHouseOperationHandler = exports.createAuctionHouseOperation = void 0;
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const programs_1 = require("../../programs");
const constants_1 = require("./constants");
// -----------------
// Operation
// -----------------
const Key = 'CreateAuctionHouseOperation';
exports.createAuctionHouseOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.createAuctionHouseOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const builder = (0, exports.createAuctionHouseBuilder)(metaplex, operation.input);
        const response = yield metaplex
            .rpc()
            .sendAndConfirmTransaction(builder, undefined, operation.input.confirmOptions);
        return Object.assign({ response }, builder.getContext());
    }),
};
const createAuctionHouseBuilder = (metaplex, params) => {
    var _a, _b, _c, _d, _e, _f, _g;
    // Data.
    const canChangeSalePrice = (_a = params.canChangeSalePrice) !== null && _a !== void 0 ? _a : false;
    const requiresSignOff = (_b = params.requiresSignOff) !== null && _b !== void 0 ? _b : canChangeSalePrice;
    // Accounts.
    const authority = (_c = params.authority) !== null && _c !== void 0 ? _c : metaplex.identity().publicKey;
    const payer = (_d = params.payer) !== null && _d !== void 0 ? _d : metaplex.identity();
    const treasuryMint = (_e = params.treasuryMint) !== null && _e !== void 0 ? _e : constants_1.WRAPPED_SOL_MINT;
    const treasuryWithdrawalDestinationOwner = (_f = params.treasuryWithdrawalDestinationOwner) !== null && _f !== void 0 ? _f : metaplex.identity().publicKey;
    const feeWithdrawalDestination = (_g = params.feeWithdrawalDestination) !== null && _g !== void 0 ? _g : metaplex.identity().publicKey;
    // PDAs.
    const auctionHouse = (0, programs_1.findAuctionHousePda)(authority, treasuryMint);
    const auctionHouseFeeAccount = (0, programs_1.findAuctionHouseFeePda)(auctionHouse);
    const auctionHouseTreasury = (0, programs_1.findAuctionHouseTreasuryPda)(auctionHouse);
    const treasuryWithdrawalDestination = treasuryMint.equals(constants_1.WRAPPED_SOL_MINT)
        ? treasuryWithdrawalDestinationOwner
        : (0, programs_1.findAssociatedTokenAccountPda)(treasuryMint, treasuryWithdrawalDestinationOwner);
    return utils_1.TransactionBuilder.make()
        .setFeePayer(payer)
        .setContext({
        auctionHouse,
        auctionHouseFeeAccount,
        auctionHouseTreasury,
        treasuryWithdrawalDestination,
    })
        .add((0, programs_1.createCreateAuctionHouseInstructionWithSigners)({
        treasuryMint,
        payer,
        authority,
        feeWithdrawalDestination,
        treasuryWithdrawalDestination,
        treasuryWithdrawalDestinationOwner,
        auctionHouse,
        auctionHouseFeeAccount,
        auctionHouseTreasury,
        args: {
            bump: auctionHouse.bump,
            feePayerBump: auctionHouseFeeAccount.bump,
            treasuryBump: auctionHouseTreasury.bump,
            sellerFeeBasisPoints: params.sellerFeeBasisPoints,
            requiresSignOff,
            canChangeSalePrice,
        },
        instructionKey: params.instructionKey,
    }));
};
exports.createAuctionHouseBuilder = createAuctionHouseBuilder;
//# sourceMappingURL=createAuctionHouse.js.map