"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMintAndMintToAssociatedTokenBuilder = void 0;
const utils_1 = require("../../../utils");
const createMintBuilder_1 = require("./createMintBuilder");
const createAssociatedTokenAccountBuilder_1 = require("./createAssociatedTokenAccountBuilder");
const mintToBuilder_1 = require("./mintToBuilder");
const createMintAndMintToAssociatedTokenBuilder = (params) => {
    const { lamports, decimals, amount, createAssociatedToken = true, mint, payer, mintAuthority, owner, associatedToken, freezeAuthority, tokenProgram, associatedTokenProgram, createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, } = params;
    return (utils_1.TransactionBuilder.make()
        // Create and initialize the mint account.
        .add((0, createMintBuilder_1.createMintBuilder)({
        lamports,
        decimals,
        mint,
        payer,
        mintAuthority: mintAuthority.publicKey,
        freezeAuthority,
        tokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
    }))
        // Create the associated account if it does not exists.
        .when(createAssociatedToken, (tx) => tx.add((0, createAssociatedTokenAccountBuilder_1.createAssociatedTokenAccountBuilder)({
        payer,
        associatedToken,
        owner,
        mint: mint.publicKey,
        tokenProgram,
        associatedTokenProgram,
        instructionKey: createAssociatedTokenInstructionKey,
    })))
        // Mint to the associated token.
        .add((0, mintToBuilder_1.mintToBuilder)({
        mint: mint.publicKey,
        destination: associatedToken,
        mintAuthority,
        amount,
        tokenProgram,
        instructionKey: mintToInstructionKey,
    })));
};
exports.createMintAndMintToAssociatedTokenBuilder = createMintAndMintToAssociatedTokenBuilder;
//# sourceMappingURL=createMintAndMintToAssociatedTokenBuilder.js.map