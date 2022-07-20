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
exports.updateAuctionHouseBuilder = exports.updateAuctionHouseOperationHandler = exports.updateAuctionHouseOperation = void 0;
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const programs_1 = require("../../programs");
const errors_1 = require("./errors");
// -----------------
// Operation
// -----------------
const Key = 'UpdateAuctionHouseOperation';
exports.updateAuctionHouseOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.updateAuctionHouseOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield metaplex
            .rpc()
            .sendAndConfirmTransaction((0, exports.updateAuctionHouseBuilder)(metaplex, operation.input), undefined, operation.input.confirmOptions);
        return {
            response,
        };
    }),
};
const updateAuctionHouseBuilder = (metaplex, params) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const authority = (_a = params.authority) !== null && _a !== void 0 ? _a : metaplex.identity();
    const payer = (_b = params.payer) !== null && _b !== void 0 ? _b : metaplex.identity();
    const auctionHouse = params.auctionHouse;
    const newAuthority = (_c = params.newAuthority) !== null && _c !== void 0 ? _c : auctionHouse.authority;
    const treasuryMint = (_d = params.treasuryMint) !== null && _d !== void 0 ? _d : auctionHouse.treasuryMint;
    const feeWithdrawalDestination = (_e = params.feeWithdrawalDestination) !== null && _e !== void 0 ? _e : auctionHouse.feeWithdrawalDestination;
    let treasuryWithdrawalDestinationOwner;
    let treasuryWithdrawalDestination;
    if (auctionHouse.usesSol()) {
        treasuryWithdrawalDestinationOwner =
            (_f = params.treasuryWithdrawalDestinationOwner) !== null && _f !== void 0 ? _f : auctionHouse.treasuryWithdrawalDestination;
        treasuryWithdrawalDestination = treasuryWithdrawalDestinationOwner;
    }
    else if (params.treasuryWithdrawalDestinationOwner) {
        treasuryWithdrawalDestinationOwner =
            params.treasuryWithdrawalDestinationOwner;
        treasuryWithdrawalDestination = (0, programs_1.findAssociatedTokenAccountPda)(treasuryMint, treasuryWithdrawalDestinationOwner);
    }
    else {
        throw new errors_1.TreasureDestinationOwnerRequiredError();
    }
    return utils_1.TransactionBuilder.make()
        .setFeePayer(payer)
        .add((0, programs_1.createUpdateAuctionHouseInstructionWithSigners)({
        treasuryMint,
        payer,
        authority,
        newAuthority,
        feeWithdrawalDestination,
        treasuryWithdrawalDestination,
        treasuryWithdrawalDestinationOwner,
        auctionHouse: auctionHouse.address,
        args: {
            sellerFeeBasisPoints: (_g = params.sellerFeeBasisPoints) !== null && _g !== void 0 ? _g : null,
            requiresSignOff: (_h = params.requiresSignOff) !== null && _h !== void 0 ? _h : null,
            canChangeSalePrice: (_j = params.canChangeSalePrice) !== null && _j !== void 0 ? _j : null,
        },
        instructionKey: params.instructionKey,
    }));
};
exports.updateAuctionHouseBuilder = updateAuctionHouseBuilder;
//# sourceMappingURL=updateAuctionHouse.js.map