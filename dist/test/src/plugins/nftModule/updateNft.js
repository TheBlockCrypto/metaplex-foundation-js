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
exports.updateNftBuilder = exports.updateNftOperationHandler = exports.updateNftOperation = void 0;
const types_1 = require("../../types");
const programs_1 = require("../../programs");
const utils_1 = require("../../utils");
const Key = 'UpdateNftOperation';
exports.updateNftOperation = (0, types_1.useOperation)(Key);
exports.updateNftOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { nft, newUpdateAuthority = nft.updateAuthority, primarySaleHappened = nft.primarySaleHappened, isMutable = nft.isMutable, updateAuthority = metaplex.identity(), confirmOptions, } = operation.input;
        const data = resolveData(operation.input);
        const metadata = (0, programs_1.findMetadataPda)(nft.mint);
        const { signature } = yield metaplex.rpc().sendAndConfirmTransaction((0, exports.updateNftBuilder)({
            data,
            newUpdateAuthority,
            primarySaleHappened,
            isMutable,
            updateAuthority,
            metadata,
        }), undefined, confirmOptions);
        return { transactionId: signature };
    }),
};
const resolveData = (input) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { nft } = input;
    return {
        name: (_a = input.name) !== null && _a !== void 0 ? _a : nft.name,
        symbol: (_b = input.symbol) !== null && _b !== void 0 ? _b : nft.symbol,
        uri: (_c = input.uri) !== null && _c !== void 0 ? _c : nft.uri,
        sellerFeeBasisPoints: (_d = input.sellerFeeBasisPoints) !== null && _d !== void 0 ? _d : nft.sellerFeeBasisPoints,
        creators: (_e = input.creators) !== null && _e !== void 0 ? _e : nft.creators,
        collection: (_f = input.collection) !== null && _f !== void 0 ? _f : nft.collection,
        uses: (_g = input.uses) !== null && _g !== void 0 ? _g : nft.uses,
    };
};
const updateNftBuilder = (params) => {
    const { data, isMutable, updateAuthority, newUpdateAuthority, primarySaleHappened, metadata, instructionKey, } = params;
    return utils_1.TransactionBuilder.make().add((0, programs_1.createUpdateMetadataAccountV2InstructionWithSigners)({
        data,
        newUpdateAuthority,
        primarySaleHappened,
        isMutable,
        metadata,
        updateAuthority,
        instructionKey,
    }));
};
exports.updateNftBuilder = updateNftBuilder;
//# sourceMappingURL=updateNft.js.map