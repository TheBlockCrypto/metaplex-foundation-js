"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssociatedTokenAccountBuilder = void 0;
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("../../../utils");
const createAssociatedTokenAccountBuilder = (params) => {
    const { payer, associatedToken, owner, mint, tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, associatedTokenProgram = spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, instructionKey = 'createAssociatedTokenAccount', } = params;
    return utils_1.TransactionBuilder.make().add({
        instruction: (0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, associatedToken, owner, mint, tokenProgram, associatedTokenProgram),
        signers: [payer],
        key: instructionKey,
    });
};
exports.createAssociatedTokenAccountBuilder = createAssociatedTokenAccountBuilder;
//# sourceMappingURL=createAssociatedTokenAccountBuilder.js.map