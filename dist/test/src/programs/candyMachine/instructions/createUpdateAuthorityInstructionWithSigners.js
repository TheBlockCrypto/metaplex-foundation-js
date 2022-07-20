"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateAuthorityInstructionWithSigners = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
function createUpdateAuthorityInstructionWithSigners(params) {
    const { candyMachine, authority, wallet, newAuthority, instructionKey = 'updateCandyMachineAuthority', } = params;
    return {
        instruction: (0, mpl_candy_machine_1.createUpdateAuthorityInstruction)({
            candyMachine,
            authority: authority.publicKey,
            wallet,
        }, { newAuthority }),
        signers: [authority],
        key: instructionKey,
    };
}
exports.createUpdateAuthorityInstructionWithSigners = createUpdateAuthorityInstructionWithSigners;
//# sourceMappingURL=createUpdateAuthorityInstructionWithSigners.js.map