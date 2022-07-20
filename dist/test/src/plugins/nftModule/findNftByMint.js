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
exports.findNftByMintOnChainOperationHandler = exports.findNftByMintOperation = void 0;
const programs_1 = require("../../programs");
const types_1 = require("../../types");
const errors_1 = require("../../errors");
const Nft_1 = require("./Nft");
const Key = 'FindNftByMintOperation';
exports.findNftByMintOperation = (0, types_1.useOperation)(Key);
exports.findNftByMintOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const mint = operation.input;
        const [metadata, edition] = yield metaplex
            .rpc()
            .getMultipleAccounts([
            (0, programs_1.findMetadataPda)(mint),
            (0, programs_1.findMasterEditionV2Pda)(mint),
        ]);
        const metadataAccount = (0, programs_1.parseMetadataAccount)(metadata);
        const editionAccount = (0, programs_1.parseOriginalOrPrintEditionAccount)(edition);
        if (!metadataAccount.exists) {
            throw new errors_1.NftNotFoundError(mint);
        }
        const nft = new Nft_1.Nft(metadataAccount, metaplex);
        try {
            yield nft.metadataTask.run();
        }
        catch (e) {
            // Fail silently...
        }
        nft.editionTask.loadWith(editionAccount.exists ? editionAccount : null);
        return nft;
    }),
};
//# sourceMappingURL=findNftByMint.js.map