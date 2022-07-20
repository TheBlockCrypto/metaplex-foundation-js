"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreateMasterEditionV3InstructionWithSigners = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const createCreateMasterEditionV3InstructionWithSigners = (params) => {
    const { maxSupply = null, payer, mintAuthority, updateAuthority, mint, metadata, masterEdition, instructionKey = 'createMasterEditionV3', } = params;
    return {
        instruction: (0, mpl_token_metadata_1.createCreateMasterEditionV3Instruction)({
            edition: masterEdition,
            mint,
            updateAuthority: updateAuthority.publicKey,
            mintAuthority: mintAuthority.publicKey,
            payer: payer.publicKey,
            metadata,
        }, { createMasterEditionArgs: { maxSupply } }),
        signers: [payer, mintAuthority, updateAuthority],
        key: instructionKey,
    };
};
exports.createCreateMasterEditionV3InstructionWithSigners = createCreateMasterEditionV3InstructionWithSigners;
//# sourceMappingURL=createCreateMasterEditionV3InstructionWithSigners.js.map