"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreateMetadataAccountV2InstructionWithSigners = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const createCreateMetadataAccountV2InstructionWithSigners = (params) => {
    const { data, isMutable = false, mintAuthority, payer, mint, metadata, updateAuthority, instructionKey = 'createMetadataV2', } = params;
    return {
        instruction: (0, mpl_token_metadata_1.createCreateMetadataAccountV2Instruction)({
            metadata,
            mint,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            updateAuthority,
        }, { createMetadataAccountArgsV2: { data, isMutable } }),
        signers: [payer, mintAuthority],
        key: instructionKey,
    };
};
exports.createCreateMetadataAccountV2InstructionWithSigners = createCreateMetadataAccountV2InstructionWithSigners;
//# sourceMappingURL=createCreateMetadataAccountV2InstructionWithSigners.js.map