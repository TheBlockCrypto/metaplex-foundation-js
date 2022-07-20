"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintToBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("../../../utils");
const mintToBuilder = (params) => {
    const { mint, destination, mintAuthority, amount, multiSigners = [], tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, instructionKey = 'mintTo', } = params;
    const [mintAuthorityPublicKey, signers] = mintAuthority instanceof web3_js_1.PublicKey
        ? [mintAuthority, multiSigners]
        : [mintAuthority.publicKey, [mintAuthority]];
    return utils_1.TransactionBuilder.make().add({
        instruction: (0, spl_token_1.createMintToInstruction)(mint, destination, mintAuthorityPublicKey, amount, multiSigners, tokenProgram),
        signers,
        key: instructionKey,
    });
};
exports.mintToBuilder = mintToBuilder;
//# sourceMappingURL=mintToBuilder.js.map