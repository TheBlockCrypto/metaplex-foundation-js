"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMetadataAccount = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const types_1 = require("../../../types");
exports.parseMetadataAccount = (0, types_1.getAccountParsingFunction)(mpl_token_metadata_1.Metadata);
//# sourceMappingURL=MetadataAccount.js.map