"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEditionPda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const TokenMetadataProgram_1 = require("../TokenMetadataProgram");
const findEditionPda = (mint, programId = TokenMetadataProgram_1.TokenMetadataProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('metadata', 'utf8'),
        programId.toBuffer(),
        mint.toBuffer(),
        buffer_1.Buffer.from('edition', 'utf8'),
    ]);
};
exports.findEditionPda = findEditionPda;
//# sourceMappingURL=findEditionPda.js.map