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
exports.findNftsByMintListOnChainOperationHandler = exports.findNftsByMintListOperation = void 0;
const programs_1 = require("../../programs");
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const Nft_1 = require("./Nft");
const Key = 'FindNftsByMintListOperation';
exports.findNftsByMintListOperation = (0, types_1.useOperation)(Key);
exports.findNftsByMintListOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const mints = operation.input;
        const metadataPdas = mints.map((mint) => (0, programs_1.findMetadataPda)(mint));
        const metadataInfos = yield utils_1.GmaBuilder.make(metaplex, metadataPdas).get();
        return (0, utils_1.zipMap)(metadataPdas, metadataInfos, (metadataPda, metadataInfo) => {
            if (!metadataInfo || !metadataInfo.exists)
                return null;
            try {
                const metadata = (0, programs_1.parseMetadataAccount)(metadataInfo);
                return new Nft_1.Nft(metadata, metaplex);
            }
            catch (error) {
                return null;
            }
        });
    }),
};
//# sourceMappingURL=findNftsByMintList.js.map