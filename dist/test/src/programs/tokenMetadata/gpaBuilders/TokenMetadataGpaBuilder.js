"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMetadataGpaBuilder = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const utils_1 = require("../../../utils");
class TokenMetadataGpaBuilder extends utils_1.GpaBuilder {
    constructor(metaplex, programId) {
        super(metaplex, programId !== null && programId !== void 0 ? programId : mpl_token_metadata_1.PROGRAM_ID);
    }
    whereKey(key) {
        return this.where(0, new bn_js_1.default(key, 'le'));
    }
}
exports.TokenMetadataGpaBuilder = TokenMetadataGpaBuilder;
//# sourceMappingURL=TokenMetadataGpaBuilder.js.map