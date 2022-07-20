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
exports.AuctionHouseClient = void 0;
const programs_1 = require("../../programs");
const utils_1 = require("../../utils");
const AuctionHouseBuildersClient_1 = require("./AuctionHouseBuildersClient");
const createAuctionHouse_1 = require("./createAuctionHouse");
const findAuctionHouseByAddress_1 = require("./findAuctionHouseByAddress");
const updateAuctionHouse_1 = require("./updateAuctionHouse");
class AuctionHouseClient {
    constructor(metaplex) {
        this.metaplex = metaplex;
    }
    builders() {
        return new AuctionHouseBuildersClient_1.AuctionHouseBuildersClient(this.metaplex);
    }
    createAuctionHouse(input) {
        return new utils_1.Task((scope) => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.metaplex
                .operations()
                .getTask((0, createAuctionHouse_1.createAuctionHouseOperation)(input))
                .run(scope);
            scope.throwIfCanceled();
            const auctionHouse = yield this.findAuctionHouseByAddress(output.auctionHouse).run(scope);
            return Object.assign(Object.assign({}, output), { auctionHouse });
        }));
    }
    updateAuctionHouse(auctionHouse, input) {
        return new utils_1.Task((scope) => __awaiter(this, void 0, void 0, function* () {
            const output = yield this.metaplex
                .operations()
                .getTask((0, updateAuctionHouse_1.updateAuctionHouseOperation)(Object.assign({ auctionHouse }, input)))
                .run(scope);
            scope.throwIfCanceled();
            const updatedAuctionHouse = yield this.findAuctionHouseByAddress(auctionHouse.address).run(scope);
            return Object.assign(Object.assign({}, output), { auctionHouse: updatedAuctionHouse });
        }));
    }
    findAuctionHouseByAddress(address, commitment) {
        return this.metaplex
            .operations()
            .getTask((0, findAuctionHouseByAddress_1.findAuctionHouseByAddressOperation)({ address, commitment }));
    }
    findAuctionHouseByCreatorAndMint(creator, treasuryMint, commitment) {
        return this.findAuctionHouseByAddress((0, programs_1.findAuctionHousePda)(creator, treasuryMint), commitment);
    }
}
exports.AuctionHouseClient = AuctionHouseClient;
//# sourceMappingURL=AuctionHouseClient.js.map