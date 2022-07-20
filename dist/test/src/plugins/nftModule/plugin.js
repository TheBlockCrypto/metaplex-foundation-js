"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftModule = void 0;
const NftClient_1 = require("./NftClient");
const createNft_1 = require("./createNft");
const findNftByMint_1 = require("./findNftByMint");
const findNftsByCandyMachine_1 = require("./findNftsByCandyMachine");
const findNftsByCreator_1 = require("./findNftsByCreator");
const findNftsByMintList_1 = require("./findNftsByMintList");
const findNftsByOwner_1 = require("./findNftsByOwner");
const printNewEdition_1 = require("./printNewEdition");
const updateNft_1 = require("./updateNft");
const uploadMetadata_1 = require("./uploadMetadata");
const nftModule = () => ({
    install(metaplex) {
        const op = metaplex.operations();
        op.register(createNft_1.createNftOperation, createNft_1.createNftOperationHandler);
        op.register(findNftByMint_1.findNftByMintOperation, findNftByMint_1.findNftByMintOnChainOperationHandler);
        op.register(findNftsByCandyMachine_1.findNftsByCandyMachineOperation, findNftsByCandyMachine_1.findNftsByCandyMachineOnChainOperationHandler);
        op.register(findNftsByCreator_1.findNftsByCreatorOperation, findNftsByCreator_1.findNftsByCreatorOnChainOperationHandler);
        op.register(findNftsByMintList_1.findNftsByMintListOperation, findNftsByMintList_1.findNftsByMintListOnChainOperationHandler);
        op.register(findNftsByOwner_1.findNftsByOwnerOperation, findNftsByOwner_1.findNftsByOwnerOnChainOperationHandler);
        op.register(printNewEdition_1.printNewEditionOperation, printNewEdition_1.printNewEditionOperationHandler);
        op.register(updateNft_1.updateNftOperation, updateNft_1.updateNftOperationHandler);
        op.register(uploadMetadata_1.uploadMetadataOperation, uploadMetadata_1.uploadMetadataOperationHandler);
        metaplex.nfts = function () {
            return new NftClient_1.NftClient(this);
        };
    },
});
exports.nftModule = nftModule;
//# sourceMappingURL=plugin.js.map