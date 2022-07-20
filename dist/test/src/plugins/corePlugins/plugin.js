"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corePlugins = void 0;
const corePrograms_1 = require("../corePrograms");
const identityModule_1 = require("../identityModule");
const storageModule_1 = require("../storageModule");
const rpcModule_1 = require("../rpcModule");
const operationModule_1 = require("../operationModule");
const programModule_1 = require("../programModule");
const utilsModule_1 = require("../utilsModule");
const guestIdentity_1 = require("../guestIdentity");
const bundlrStorage_1 = require("../bundlrStorage");
const nftModule_1 = require("../nftModule");
const candyMachineModule_1 = require("../candyMachineModule");
const auctionHouseModule_1 = require("../auctionHouseModule");
const corePlugins = () => ({
    install(metaplex) {
        // Low-level modules.
        metaplex.use((0, identityModule_1.identityModule)());
        metaplex.use((0, storageModule_1.storageModule)());
        metaplex.use((0, rpcModule_1.rpcModule)());
        metaplex.use((0, operationModule_1.operationModule)());
        metaplex.use((0, programModule_1.programModule)());
        metaplex.use((0, utilsModule_1.utilsModule)());
        // Default drivers.
        metaplex.use((0, guestIdentity_1.guestIdentity)());
        metaplex.use((0, bundlrStorage_1.bundlrStorage)());
        // Register core programs.
        metaplex.use((0, corePrograms_1.corePrograms)());
        // Verticals.
        metaplex.use((0, nftModule_1.nftModule)());
        metaplex.use((0, candyMachineModule_1.candyMachineModule)());
        metaplex.use((0, auctionHouseModule_1.auctionHouseModule)());
    },
});
exports.corePlugins = corePlugins;
//# sourceMappingURL=plugin.js.map