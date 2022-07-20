"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftNotFoundError = exports.NftError = void 0;
const MetaplexError_1 = require("./MetaplexError");
class NftError extends MetaplexError_1.MetaplexError {
    constructor(input) {
        super(Object.assign(Object.assign({}, input), { key: `plugin.nft.${input.key}`, title: `NFT > ${input.title}`, source: 'plugin', sourceDetails: 'NFT' }));
    }
}
exports.NftError = NftError;
class NftNotFoundError extends NftError {
    constructor(mint, cause) {
        super({
            cause,
            key: 'nft_not_found',
            title: 'NFT Not Found',
            problem: 'No Metadata account could be found for the provided mint address: ' +
                `[${mint.toBase58()}].`,
            solution: 'Ensure the provided mint address is valid and that an associated ' +
                'Metadata account exists on the blockchain.',
        });
    }
}
exports.NftNotFoundError = NftNotFoundError;
//# sourceMappingURL=NftError.js.map