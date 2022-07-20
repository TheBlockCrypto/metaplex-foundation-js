"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthorityBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("../../../utils");
const setAuthorityBuilder = (params) => {
    const { mint, currentAuthority, authorityType, newAuthority, multiSigners = [], tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, instructionKey = 'setAuthority', } = params;
    const [currentAuthorityPublicKey, signers] = currentAuthority instanceof web3_js_1.PublicKey
        ? [currentAuthority, multiSigners]
        : [currentAuthority.publicKey, [currentAuthority]];
    return utils_1.TransactionBuilder.make().add({
        instruction: (0, spl_token_1.createSetAuthorityInstruction)(mint, currentAuthorityPublicKey, authorityType, newAuthority, multiSigners, tokenProgram),
        signers,
        key: instructionKey,
    });
};
exports.setAuthorityBuilder = setAuthorityBuilder;
//# sourceMappingURL=setAuthorityBuilder.js.map