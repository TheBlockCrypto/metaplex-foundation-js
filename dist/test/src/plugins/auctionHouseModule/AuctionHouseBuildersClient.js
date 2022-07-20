"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionHouseBuildersClient = void 0;
const createAuctionHouse_1 = require("./createAuctionHouse");
const updateAuctionHouse_1 = require("./updateAuctionHouse");
class AuctionHouseBuildersClient {
    constructor(metaplex) {
        this.metaplex = metaplex;
    }
    createAuctionHouse(input) {
        return (0, createAuctionHouse_1.createAuctionHouseBuilder)(this.metaplex, input);
    }
    updateAuctionHouse(input) {
        return (0, updateAuctionHouse_1.updateAuctionHouseBuilder)(this.metaplex, input);
    }
}
exports.AuctionHouseBuildersClient = AuctionHouseBuildersClient;
//# sourceMappingURL=AuctionHouseBuildersClient.js.map