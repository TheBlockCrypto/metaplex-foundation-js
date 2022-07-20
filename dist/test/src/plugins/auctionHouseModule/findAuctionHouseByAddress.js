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
exports.findAuctionHouseByAddressOperationHandler = exports.findAuctionHouseByAddressOperation = void 0;
const types_1 = require("../../types");
const programs_1 = require("../../programs");
const AuctionHouse_1 = require("./AuctionHouse");
const errors_1 = require("../../errors");
// -----------------
// Operation
// -----------------
const Key = 'FindAuctionHouseByAddressOperation';
exports.findAuctionHouseByAddressOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.findAuctionHouseByAddressOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { address, commitment } = operation.input;
        const unparsedAccount = yield metaplex
            .rpc()
            .getAccount(address, commitment);
        if (!unparsedAccount.exists) {
            throw new errors_1.AccountNotFoundError(address, 'AuctionHouse');
        }
        const account = (0, programs_1.parseAuctionHouseAccount)(unparsedAccount);
        return new AuctionHouse_1.AuctionHouse(account);
    }),
};
//# sourceMappingURL=findAuctionHouseByAddress.js.map