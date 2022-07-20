"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateMetadataAccountV2InstructionWithSigners = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const createUpdateMetadataAccountV2InstructionWithSigners = (params) => {
    const { data, newUpdateAuthority, primarySaleHappened, isMutable, metadata, updateAuthority, instructionKey = 'updateMetadatav2', } = params;
    return {
        instruction: (0, mpl_token_metadata_1.createUpdateMetadataAccountV2Instruction)({
            metadata,
            updateAuthority: updateAuthority.publicKey,
        }, {
            updateMetadataAccountArgsV2: {
                data,
                updateAuthority: newUpdateAuthority,
                primarySaleHappened,
                isMutable,
            },
        }),
        signers: [updateAuthority],
        key: instructionKey,
    };
};
exports.createUpdateMetadataAccountV2InstructionWithSigners = createUpdateMetadataAccountV2InstructionWithSigners;
//# sourceMappingURL=createUpdateMetadataAccountV2InstructionWithSigners.js.map