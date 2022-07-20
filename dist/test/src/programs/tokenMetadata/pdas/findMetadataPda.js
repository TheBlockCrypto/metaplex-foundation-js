"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMetadataPda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const TokenMetadataProgram_1 = require("../TokenMetadataProgram");
const findMetadataPda = (mint, programId = TokenMetadataProgram_1.TokenMetadataProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('metadata', 'utf8'),
        programId.toBuffer(),
        mint.toBuffer(),
    ]);
};
exports.findMetadataPda = findMetadataPda;
//# sourceMappingURL=findMetadataPda.js.map