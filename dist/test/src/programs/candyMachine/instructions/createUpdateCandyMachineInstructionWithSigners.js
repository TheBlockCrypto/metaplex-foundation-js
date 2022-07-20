"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateCandyMachineInstructionWithSigners = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
function createUpdateCandyMachineInstructionWithSigners(params) {
    const { candyMachine, authority, wallet, data, instructionKey = 'updateCandyMachine', } = params;
    return {
        instruction: (0, mpl_candy_machine_1.createUpdateCandyMachineInstruction)({
            candyMachine,
            authority: authority.publicKey,
            wallet,
        }, { data }),
        signers: [authority],
        key: instructionKey,
    };
}
exports.createUpdateCandyMachineInstructionWithSigners = createUpdateCandyMachineInstructionWithSigners;
//# sourceMappingURL=createUpdateCandyMachineInstructionWithSigners.js.map