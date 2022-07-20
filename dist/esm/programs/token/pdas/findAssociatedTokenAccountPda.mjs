import { TokenProgram } from '../TokenProgram.mjs';
import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Pda } from '../../../types/Pda.mjs';

const findAssociatedTokenAccountPda = (mint, owner, tokenProgramId = TokenProgram.publicKey, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) => {
  return Pda.find(associatedTokenProgramId, [owner.toBuffer(), tokenProgramId.toBuffer(), mint.toBuffer()]);
};

export { findAssociatedTokenAccountPda };
//# sourceMappingURL=findAssociatedTokenAccountPda.mjs.map
