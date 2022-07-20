"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableMintingBuilder = void 0;
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("../../../utils");
const setAuthorityBuilder_1 = require("./setAuthorityBuilder");
const disableMintingBuilder = (params) => {
    const { mint, mintAuthority, multiSigners, tokenProgram, instructionKey = 'disableMinting', } = params;
    return utils_1.TransactionBuilder.make().add((0, setAuthorityBuilder_1.setAuthorityBuilder)({
        mint,
        currentAuthority: mintAuthority,
        authorityType: spl_token_1.AuthorityType.MintTokens,
        newAuthority: null,
        multiSigners,
        tokenProgram,
        instructionKey,
    }));
};
exports.disableMintingBuilder = disableMintingBuilder;
//# sourceMappingURL=disableMintingBuilder.js.map