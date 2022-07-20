"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionHouseModule = void 0;
const AuctionHouseClient_1 = require("./AuctionHouseClient");
const createAuctionHouse_1 = require("./createAuctionHouse");
const findAuctionHouseByAddress_1 = require("./findAuctionHouseByAddress");
const updateAuctionHouse_1 = require("./updateAuctionHouse");
const auctionHouseModule = () => ({
    install(metaplex) {
        const op = metaplex.operations();
        op.register(createAuctionHouse_1.createAuctionHouseOperation, createAuctionHouse_1.createAuctionHouseOperationHandler);
        op.register(updateAuctionHouse_1.updateAuctionHouseOperation, updateAuctionHouse_1.updateAuctionHouseOperationHandler);
        op.register(findAuctionHouseByAddress_1.findAuctionHouseByAddressOperation, findAuctionHouseByAddress_1.findAuctionHouseByAddressOperationHandler);
        metaplex.auctions = function () {
            return new AuctionHouseClient_1.AuctionHouseClient(this);
        };
    },
});
exports.auctionHouseModule = auctionHouseModule;
//# sourceMappingURL=plugin.js.map