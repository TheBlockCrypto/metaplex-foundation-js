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
exports.findNftsByCreatorOnChainOperationHandler = exports.findNftsByCreatorOperation = void 0;
const types_1 = require("../../types");
const programs_1 = require("../../programs");
const findNftsByMintList_1 = require("./findNftsByMintList");
const Key = 'FindNftsByCreatorOperation';
exports.findNftsByCreatorOperation = (0, types_1.useOperation)(Key);
exports.findNftsByCreatorOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { creator, position = 1 } = operation.input;
        const mints = yield programs_1.TokenMetadataProgram.metadataV1Accounts(metaplex)
            .selectMint()
            .whereCreator(position, creator)
            .getDataAsPublicKeys();
        const nfts = yield metaplex
            .operations()
            .execute((0, findNftsByMintList_1.findNftsByMintListOperation)(mints));
        return nfts.filter((nft) => nft !== null);
    }),
};
//# sourceMappingURL=findNftsByCreator.js.map