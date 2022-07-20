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
exports.NftClient = void 0;
const findNftByMint_1 = require("./findNftByMint");
const findNftsByMintList_1 = require("./findNftsByMintList");
const findNftsByOwner_1 = require("./findNftsByOwner");
const findNftsByCreator_1 = require("./findNftsByCreator");
const findNftsByCandyMachine_1 = require("./findNftsByCandyMachine");
const uploadMetadata_1 = require("./uploadMetadata");
const createNft_1 = require("./createNft");
const updateNft_1 = require("./updateNft");
const printNewEdition_1 = require("./printNewEdition");
class NftClient {
    constructor(metaplex) {
        this.metaplex = metaplex;
    }
    findByMint(mint) {
        return this.metaplex.operations().execute((0, findNftByMint_1.findNftByMintOperation)(mint));
    }
    findAllByMintList(mints) {
        return this.metaplex
            .operations()
            .execute((0, findNftsByMintList_1.findNftsByMintListOperation)(mints));
    }
    findAllByOwner(owner) {
        return this.metaplex.operations().execute((0, findNftsByOwner_1.findNftsByOwnerOperation)(owner));
    }
    findAllByCreator(creator, position = 1) {
        return this.metaplex
            .operations()
            .execute((0, findNftsByCreator_1.findNftsByCreatorOperation)({ creator, position }));
    }
    findAllByCandyMachine(candyMachine, version) {
        return this.metaplex
            .operations()
            .execute((0, findNftsByCandyMachine_1.findNftsByCandyMachineOperation)({ candyMachine, version }));
    }
    uploadMetadata(input) {
        return this.metaplex.operations().execute((0, uploadMetadata_1.uploadMetadataOperation)(input));
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = (0, createNft_1.createNftOperation)(input);
            const createNftOutput = yield this.metaplex.operations().execute(operation);
            const nft = yield this.findByMint(createNftOutput.mint.publicKey);
            return Object.assign(Object.assign({}, createNftOutput), { nft });
        });
    }
    update(nft, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = (0, updateNft_1.updateNftOperation)(Object.assign(Object.assign({}, input), { nft }));
            const updateNftOutput = yield this.metaplex.operations().execute(operation);
            const updatedNft = yield this.findByMint(nft.mint);
            return Object.assign(Object.assign({}, updateNftOutput), { nft: updatedNft });
        });
    }
    printNewEdition(originalMint, input = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = (0, printNewEdition_1.printNewEditionOperation)(Object.assign({ originalMint }, input));
            const printNewEditionOutput = yield this.metaplex
                .operations()
                .execute(operation);
            const nft = yield this.findByMint(printNewEditionOutput.mint.publicKey);
            return Object.assign(Object.assign({}, printNewEditionOutput), { nft });
        });
    }
}
exports.NftClient = NftClient;
//# sourceMappingURL=NftClient.js.map