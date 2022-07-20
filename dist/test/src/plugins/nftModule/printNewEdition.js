"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printNewEditionBuilder = exports.printNewEditionOperationHandler = exports.printNewEditionOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const bn_js_1 = __importDefault(require("bn.js"));
const programs_1 = require("../../programs");
const types_1 = require("../../types");
const errors_1 = require("../../errors");
const utils_1 = require("../../utils");
const Key = 'PrintNewEditionOperation';
exports.printNewEditionOperation = (0, types_1.useOperation)(Key);
exports.printNewEditionOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { originalMint, newMint = web3_js_1.Keypair.generate(), newMintAuthority = metaplex.identity(), newUpdateAuthority = newMintAuthority.publicKey, newOwner = newMintAuthority.publicKey, newFreezeAuthority, payer = metaplex.identity(), tokenProgram, associatedTokenProgram, confirmOptions, } = operation.input;
        // Original NFT.
        const originalMetadata = (0, programs_1.findMetadataPda)(originalMint);
        const originalEdition = (0, programs_1.findMasterEditionV2Pda)(originalMint);
        const originalEditionAccount = (0, programs_1.parseOriginalEditionAccount)(yield metaplex.rpc().getAccount(originalEdition));
        if (!originalEditionAccount.exists) {
            throw new errors_1.AccountNotFoundError(originalEdition, 'OriginalEdition', `Ensure the provided mint address for the original NFT [${originalMint.toBase58()}] ` +
                `is correct and that it has an associated OriginalEdition PDA.`);
        }
        const edition = new bn_js_1.default(originalEditionAccount.data.supply, 'le').add(new bn_js_1.default(1));
        const originalEditionMarkPda = (0, programs_1.findEditionMarkerPda)(originalMint, edition);
        // New NFT.
        const newMetadata = (0, programs_1.findMetadataPda)(newMint.publicKey);
        const newEdition = (0, programs_1.findEditionPda)(newMint.publicKey);
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(metaplex.connection);
        const newAssociatedToken = (0, programs_1.findAssociatedTokenAccountPda)(newMint.publicKey, newOwner, tokenProgram, associatedTokenProgram);
        const sharedInput = {
            lamports,
            edition,
            newMint,
            newMetadata,
            newEdition,
            newMintAuthority,
            newUpdateAuthority,
            newOwner,
            newAssociatedToken,
            newFreezeAuthority,
            payer,
            originalMetadata,
            originalEdition,
            originalEditionMarkPda,
            tokenProgram,
            associatedTokenProgram,
        };
        let transactionBuilder;
        if (operation.input.via === 'vault') {
            transactionBuilder = (0, exports.printNewEditionBuilder)(Object.assign({ via: 'vault', vaultAuthority: operation.input.vaultAuthority, safetyDepositStore: operation.input.safetyDepositStore, safetyDepositBox: operation.input.safetyDepositBox, vault: operation.input.vault, tokenVaultProgram: operation.input.tokenVaultProgram }, sharedInput));
        }
        else {
            const originalTokenAccountOwner = (_a = operation.input.originalTokenAccountOwner) !== null && _a !== void 0 ? _a : metaplex.identity();
            const originalTokenAccount = (_b = operation.input.originalTokenAccount) !== null && _b !== void 0 ? _b : (0, programs_1.findAssociatedTokenAccountPda)(originalMint, originalTokenAccountOwner.publicKey, tokenProgram, associatedTokenProgram);
            transactionBuilder = (0, exports.printNewEditionBuilder)(Object.assign({ via: 'token', originalTokenAccountOwner,
                originalTokenAccount }, sharedInput));
        }
        const { signature } = yield metaplex
            .rpc()
            .sendAndConfirmTransaction(transactionBuilder, undefined, confirmOptions);
        return {
            mint: newMint,
            metadata: newMetadata,
            edition: newEdition,
            associatedToken: newAssociatedToken,
            transactionId: signature,
        };
    }),
};
const printNewEditionBuilder = (params) => {
    const { 
    // Data.
    lamports, edition, 
    // New NFT.
    newMint, newMetadata, newEdition, newMintAuthority, newUpdateAuthority, newOwner, newAssociatedToken, newFreezeAuthority, payer, 
    // Master NFT.
    originalMetadata, originalEdition, originalEditionMarkPda, 
    // Programs.
    tokenProgram, associatedTokenProgram, 
    // Instruction keys.
    createAccountInstructionKey, initializeMintInstructionKey, createAssociatedTokenInstructionKey, mintToInstructionKey, printNewEditionInstructionKey = 'printNewEdition', } = params;
    let printNewEditionInstructionWithSigners;
    if (params.via === 'vault') {
        printNewEditionInstructionWithSigners =
            (0, programs_1.createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners)({
                edition,
                newMetadata,
                newEdition,
                masterEdition: originalEdition,
                newMint,
                editionMarkPda: originalEditionMarkPda,
                newMintAuthority,
                payer,
                vaultAuthority: params.vaultAuthority,
                safetyDepositStore: params.safetyDepositStore,
                safetyDepositBox: params.safetyDepositBox,
                vault: params.vault,
                newMetadataUpdateAuthority: newUpdateAuthority,
                metadata: originalMetadata,
                tokenVaultProgram: params.tokenVaultProgram,
                instructionKey: printNewEditionInstructionKey,
            });
    }
    else {
        printNewEditionInstructionWithSigners =
            (0, programs_1.createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners)({
                edition,
                newMetadata,
                newEdition,
                masterEdition: originalEdition,
                newMint,
                editionMarkPda: originalEditionMarkPda,
                newMintAuthority,
                payer,
                tokenAccountOwner: params.originalTokenAccountOwner,
                tokenAccount: params.originalTokenAccount,
                newMetadataUpdateAuthority: newUpdateAuthority,
                metadata: originalMetadata,
                instructionKey: printNewEditionInstructionKey,
            });
    }
    return (utils_1.TransactionBuilder.make()
        .setFeePayer(payer)
        // Create the mint account and send one token to the holder.
        .add((0, programs_1.createMintAndMintToAssociatedTokenBuilder)({
        lamports,
        decimals: 0,
        amount: 1,
        createAssociatedToken: true,
        mint: newMint,
        payer,
        mintAuthority: newMintAuthority,
        owner: newOwner,
        associatedToken: newAssociatedToken,
        freezeAuthority: newFreezeAuthority,
        tokenProgram,
        associatedTokenProgram,
        createAccountInstructionKey,
        initializeMintInstructionKey,
        createAssociatedTokenInstructionKey,
        mintToInstructionKey,
    }))
        // Mint new edition.
        .add(printNewEditionInstructionWithSigners));
};
exports.printNewEditionBuilder = printNewEditionBuilder;
//# sourceMappingURL=printNewEdition.js.map