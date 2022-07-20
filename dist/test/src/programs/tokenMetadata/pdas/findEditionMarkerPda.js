"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEditionMarkerPda = void 0;
const buffer_1 = require("buffer");
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("../../../types");
const TokenMetadataProgram_1 = require("../TokenMetadataProgram");
const findEditionMarkerPda = (mint, edition, programId = TokenMetadataProgram_1.TokenMetadataProgram.publicKey) => {
    return types_1.Pda.find(programId, [
        buffer_1.Buffer.from('metadata', 'utf8'),
        programId.toBuffer(),
        mint.toBuffer(),
        buffer_1.Buffer.from('edition', 'utf8'),
        buffer_1.Buffer.from(edition.div(new bn_js_1.default(248)).toString()),
    ]);
};
exports.findEditionMarkerPda = findEditionMarkerPda;
//# sourceMappingURL=findEditionMarkerPda.js.map