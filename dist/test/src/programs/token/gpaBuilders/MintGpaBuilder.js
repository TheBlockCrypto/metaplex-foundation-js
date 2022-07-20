"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintGpaBuilder = void 0;
const spl_token_1 = require("@solana/spl-token");
const utils_1 = require("../../../utils");
class MintGpaBuilder extends utils_1.GpaBuilder {
    constructor(metaplex, programId) {
        super(metaplex, programId !== null && programId !== void 0 ? programId : spl_token_1.TOKEN_PROGRAM_ID);
        this.whereSize(spl_token_1.MINT_SIZE);
    }
    whereDoesntHaveMintAuthority() {
        return this.where(0, 0);
    }
    whereHasMintAuthority() {
        return this.where(0, 1);
    }
    whereMintAuthority(mintAuthority) {
        return this.whereHasMintAuthority().where(4, mintAuthority);
    }
    whereSupply(supply) {
        return this.where(36, supply);
    }
}
exports.MintGpaBuilder = MintGpaBuilder;
//# sourceMappingURL=MintGpaBuilder.js.map