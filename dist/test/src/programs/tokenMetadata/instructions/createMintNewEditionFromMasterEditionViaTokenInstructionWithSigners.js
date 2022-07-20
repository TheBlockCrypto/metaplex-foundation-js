"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners = (params) => {
    const { edition, newMetadata, newEdition, masterEdition, newMint, editionMarkPda, newMintAuthority, payer, tokenAccountOwner, tokenAccount, newMetadataUpdateAuthority, metadata, instructionKey = 'mintNewEditionFromMasterEditionViaToken', } = params;
    return {
        instruction: (0, mpl_token_metadata_1.createMintNewEditionFromMasterEditionViaTokenInstruction)({
            newMetadata,
            newEdition,
            masterEdition,
            newMint: newMint.publicKey,
            editionMarkPda,
            newMintAuthority: newMintAuthority.publicKey,
            payer: payer.publicKey,
            tokenAccountOwner: tokenAccountOwner.publicKey,
            tokenAccount,
            newMetadataUpdateAuthority,
            metadata,
        }, { mintNewEditionFromMasterEditionViaTokenArgs: { edition } }),
        signers: [newMint, newMintAuthority, payer, tokenAccountOwner],
        key: instructionKey,
    };
};
exports.createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners = createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners;
//# sourceMappingURL=createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners.js.map