"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners = void 0;
const web3_js_1 = require("@solana/web3.js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners = (params) => {
    const { edition, newMetadata, newEdition, masterEdition, newMint, editionMarkPda, newMintAuthority, payer, vaultAuthority, safetyDepositStore, safetyDepositBox, vault, newMetadataUpdateAuthority, metadata, tokenVaultProgram = new web3_js_1.PublicKey('vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn'), instructionKey = 'mintNewEditionFromMasterEditionViaVaultProxy', } = params;
    return {
        instruction: (0, mpl_token_metadata_1.createMintNewEditionFromMasterEditionViaVaultProxyInstruction)({
            newMetadata,
            newEdition,
            masterEdition,
            newMint: newMint.publicKey,
            editionMarkPda,
            newMintAuthority: newMintAuthority.publicKey,
            payer: payer.publicKey,
            vaultAuthority: vaultAuthority.publicKey,
            safetyDepositStore,
            safetyDepositBox,
            vault,
            newMetadataUpdateAuthority,
            metadata,
            tokenVaultProgram,
        }, { mintNewEditionFromMasterEditionViaTokenArgs: { edition } }),
        signers: [newMint, newMintAuthority, payer, vaultAuthority],
        key: instructionKey,
    };
};
exports.createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners = createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners;
//# sourceMappingURL=createMintNewEditionFromMasterEditionViaVaultProxyInstructionWithSigners.js.map