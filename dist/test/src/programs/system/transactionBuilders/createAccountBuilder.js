"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../../../utils");
const createAccountBuilder = (params) => {
    const { space, lamports, payer, newAccount, program = web3_js_1.SystemProgram.programId, instructionKey = 'createAccount', } = params;
    return utils_1.TransactionBuilder.make().add({
        instruction: web3_js_1.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: newAccount.publicKey,
            space,
            lamports,
            programId: program,
        }),
        signers: [payer, newAccount],
        key: instructionKey,
    });
};
exports.createAccountBuilder = createAccountBuilder;
//# sourceMappingURL=createAccountBuilder.js.map