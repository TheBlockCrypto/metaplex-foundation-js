"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const index_1 = require("../../../src/index");
const programs_1 = require("../../../src/programs");
const helpers_1 = require("../../helpers");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
(0, helpers_1.killStuckProcess)();
/*
 * Regression test.
 * @see https://github.com/metaplex-foundation/metaplex-program-library/issues/383
 */
(0, tape_1.default)('it works when we give an explicit payer for the create metadata ix only', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have everything we need to create a Metadata account.
    const mx = yield (0, helpers_1.metaplex)();
    const mint = web3_js_1.Keypair.generate();
    const associatedToken = (0, programs_1.findAssociatedTokenAccountPda)(mint.publicKey, mx.identity().publicKey);
    const metadata = (0, programs_1.findMetadataPda)(mint.publicKey);
    const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(mx.connection);
    const { uri } = yield mx.nfts().uploadMetadata({ name: 'Metadata Name' });
    const data = {
        name: 'My NFT',
        symbol: 'MNFT',
        sellerFeeBasisPoints: 10,
        uri,
        creators: [
            {
                address: mx.identity().publicKey,
                share: 100,
                verified: false,
            },
        ],
        collection: null,
        uses: null,
    };
    // And an explicit payer account that is only used to pay for the Metadata account storage.
    const explicitPayer = web3_js_1.Keypair.generate();
    yield helpers_1.amman.airdrop(mx.connection, explicitPayer.publicKey, 1);
    // When we assemble that transaction.
    const tx = index_1.TransactionBuilder.make()
        .add((0, programs_1.createMintAndMintToAssociatedTokenBuilder)({
        lamports,
        decimals: 0,
        amount: 1,
        createAssociatedToken: true,
        mint,
        payer: mx.identity(),
        mintAuthority: mx.identity(),
        owner: mx.identity().publicKey,
        associatedToken,
    }))
        .add((0, programs_1.createCreateMetadataAccountV2InstructionWithSigners)({
        data,
        isMutable: false,
        mintAuthority: mx.identity(),
        payer: explicitPayer,
        mint: mint.publicKey,
        metadata,
        updateAuthority: mx.identity().publicKey,
    }));
    // And send it with confirmation.
    yield mx.rpc().sendAndConfirmTransaction(tx);
    // Then the transaction succeeded and the NFT was created.
    const nft = yield mx.nfts().findByMint(mint.publicKey);
    t.equal(nft.name, 'My NFT');
    t.equal(nft.metadataAccount.publicKey.toBase58(), metadata.toBase58());
}));
//# sourceMappingURL=createMetadataV2Builder.test.js.map