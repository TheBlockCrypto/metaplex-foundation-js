"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMasterEditionV2Pda = void 0;
const buffer_1 = require("buffer");
const types_1 = require("../../../types");
const TokenMetadataProgram_1 = require("../TokenMetadataProgram");
const findMasterEditionV2Pda = (mint, programId = TokenMetadataProgram_1.TokenMetadataProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('metadata', 'utf8'),
        programId.toBuffer(),
        mint.toBuffer(),
        buffer_1.Buffer.from('edition', 'utf8'),
    ]);
};
exports.findMasterEditionV2Pda = findMasterEditionV2Pda;
//# sourceMappingURL=findMasterEditionV2Pda.js.map