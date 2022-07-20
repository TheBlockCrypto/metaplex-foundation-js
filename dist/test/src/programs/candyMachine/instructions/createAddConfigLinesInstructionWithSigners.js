"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddConfigLinesInstructionWithSigners = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
function createAddConfigLinesInstructionWithSigners(params) {
    const { candyMachine, authority, index, configLines, instructionKey = 'addConfigLinesToCandyMachine', } = params;
    return {
        instruction: (0, mpl_candy_machine_1.createAddConfigLinesInstruction)({
            candyMachine,
            authority: authority.publicKey,
        }, { index, configLines }),
        signers: [authority],
        key: instructionKey,
    };
}
exports.createAddConfigLinesInstructionWithSigners = createAddConfigLinesInstructionWithSigners;
//# sourceMappingURL=createAddConfigLinesInstructionWithSigners.js.map