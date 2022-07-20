"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitializeCandyMachineInstructionWithSigners = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const createInitializeCandyMachineInstructionWithSigners = (params) => {
    const { data, candyMachine, wallet, authority, payer, instructionKey = 'initializeCandyMachine', } = params;
    return {
        instruction: (0, mpl_candy_machine_1.createInitializeCandyMachineInstruction)({
            candyMachine: candyMachine.publicKey,
            wallet,
            authority,
            payer: payer.publicKey,
        }, { data }),
        signers: [candyMachine, payer],
        key: instructionKey,
    };
};
exports.createInitializeCandyMachineInstructionWithSigners = createInitializeCandyMachineInstructionWithSigners;
//# sourceMappingURL=createInitializeCandyMachineInstructionWithSigners.js.map