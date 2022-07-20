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
const spok_1 = __importDefault(require("spok"));
const web3_js_1 = require("@solana/web3.js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const index_1 = require("../../../src/index");
const helpers_1 = require("../../helpers");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('it can create an NFT with minimum configuration', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And we uploaded an image.
    const imageFile = (0, index_1.useMetaplexFile)('some_image', 'some-image.jpg');
    const imageUri = yield mx.storage().upload(imageFile);
    // And we uploaded some metadata containing this image.
    const metadataUri = yield mx.storage().uploadJson({
        name: 'JSON NFT name',
        description: 'JSON NFT description',
        image: imageUri,
    });
    // When we create a new NFT with minimum configuration.
    const { nft } = yield mx.nfts().create({
        uri: metadataUri,
        name: 'On-chain NFT name',
    });
    // Then we created and returned the new NFT and it has appropriate defaults.
    const expectedNft = {
        name: 'On-chain NFT name',
        uri: metadataUri,
        metadata: {
            name: 'JSON NFT name',
            description: 'JSON NFT description',
            image: imageUri,
        },
        sellerFeeBasisPoints: 500,
        primarySaleHappened: false,
        updateAuthority: (0, helpers_1.spokSamePubkey)(mx.identity().publicKey),
        creators: [
            {
                address: (0, helpers_1.spokSamePubkey)(mx.identity().publicKey),
                share: 100,
                verified: true,
            },
        ],
        collection: null,
        uses: null,
    };
    (0, spok_1.default)(t, nft, Object.assign({ $topic: 'nft' }, expectedNft));
    // When we then retrieve that NFT.
    const retrievedNft = yield mx.nfts().findByMint(nft.mint);
    // Then it matches what createNft returned.
    (0, spok_1.default)(t, retrievedNft, Object.assign({ $topic: 'Retrieved Nft' }, expectedNft));
}));
(0, tape_1.default)('it can create an NFT with maximum configuration', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And we uploaded some metadata.
    const { uri, metadata } = yield mx.nfts().uploadMetadata({
        name: 'JSON NFT name',
        description: 'JSON NFT description',
        image: (0, index_1.useMetaplexFile)('some_image', 'some-image.jpg'),
    });
    // And a various keypairs for different access.
    const mint = web3_js_1.Keypair.generate();
    const collection = web3_js_1.Keypair.generate();
    const owner = web3_js_1.Keypair.generate();
    const mintAuthority = web3_js_1.Keypair.generate();
    const updateAuthority = web3_js_1.Keypair.generate();
    const otherCreator = web3_js_1.Keypair.generate();
    // When we create a new NFT with minimum configuration.
    const { nft } = yield mx.nfts().create({
        uri,
        name: 'On-chain NFT name',
        symbol: 'MYNFT',
        sellerFeeBasisPoints: 456,
        isMutable: true,
        maxSupply: 123,
        mint: mint,
        payer: mx.identity(),
        mintAuthority: mintAuthority,
        updateAuthority: updateAuthority,
        owner: owner.publicKey,
        // Must be the same as mint authority.
        // https://github.com/metaplex-foundation/metaplex-program-library/blob/c0bf49d416d6aaf5aa9db999343b20be720df67a/token-metadata/program/src/utils.rs#L346
        freezeAuthority: mintAuthority.publicKey,
        collection: {
            verified: false,
            key: collection.publicKey,
        },
        uses: {
            useMethod: mpl_token_metadata_1.UseMethod.Burn,
            remaining: 0,
            total: 1000,
        },
        creators: [
            {
                address: updateAuthority.publicKey,
                share: 60,
                verified: true,
            },
            {
                address: otherCreator.publicKey,
                share: 40,
                verified: false,
            },
        ],
    });
    // Then we created and retrieved the new NFT and it has appropriate defaults.
    (0, spok_1.default)(t, nft, {
        $topic: 'nft',
        name: 'On-chain NFT name',
        uri: spok_1.default.string,
        metadata: {
            name: 'JSON NFT name',
            description: 'JSON NFT description',
            image: metadata.image,
        },
        sellerFeeBasisPoints: 456,
        primarySaleHappened: false,
        updateAuthority: (0, helpers_1.spokSamePubkey)(updateAuthority.publicKey),
        collection: {
            verified: false,
            key: (0, helpers_1.spokSamePubkey)(collection.publicKey),
        },
        uses: {
            useMethod: mpl_token_metadata_1.UseMethod.Burn,
            remaining: (0, helpers_1.spokSameBignum)(0),
            total: (0, helpers_1.spokSameBignum)(1000),
        },
        creators: [
            {
                address: (0, helpers_1.spokSamePubkey)(updateAuthority.publicKey),
                share: 60,
                verified: true,
            },
            {
                address: (0, helpers_1.spokSamePubkey)(otherCreator.publicKey),
                share: 40,
                verified: false,
            },
        ],
    });
}));
(0, tape_1.default)('it fill missing on-chain data from the JSON metadata', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And we uploaded some metadata.
    const creatorA = web3_js_1.Keypair.generate().publicKey;
    const creatorB = web3_js_1.Keypair.generate().publicKey;
    const { uri, metadata } = yield mx.nfts().uploadMetadata({
        name: 'JSON NFT name',
        symbol: 'MYNFT',
        description: 'JSON NFT description',
        image: (0, index_1.useMetaplexFile)('some_image', 'some-image.jpg'),
        seller_fee_basis_points: 456,
        properties: {
            creators: [
                {
                    address: mx.identity().publicKey.toBase58(),
                    share: 50,
                },
                {
                    address: creatorA.toBase58(),
                    share: 30,
                },
                {
                    address: creatorB.toBase58(),
                    share: 20,
                },
            ],
        },
    });
    // When we create a new NFT using that JSON metadata only.
    const { nft } = yield mx.nfts().create({ uri });
    // Then the created NFT used some of the JSON metadata to fill some on-chain data.
    (0, spok_1.default)(t, nft, {
        $topic: 'nft',
        name: 'JSON NFT name',
        symbol: 'MYNFT',
        uri,
        metadata,
        sellerFeeBasisPoints: 456,
        creators: [
            {
                address: (0, helpers_1.spokSamePubkey)(mx.identity().publicKey),
                share: 50,
                verified: true,
            },
            {
                address: (0, helpers_1.spokSamePubkey)(creatorA),
                share: 30,
                verified: false,
            },
            {
                address: (0, helpers_1.spokSamePubkey)(creatorB),
                share: 20,
                verified: false,
            },
        ],
    });
}));
(0, tape_1.default)('it can make another signer wallet pay for the storage and transaction fees', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    const initialIdentityBalance = yield mx.connection.getBalance(mx.identity().publicKey);
    // And a keypair that will pay for the storage.
    const payer = web3_js_1.Keypair.generate();
    yield helpers_1.amman.airdrop(mx.connection, payer.publicKey, 1);
    t.equal(yield mx.connection.getBalance(payer.publicKey), 1000000000);
    // When we create a new NFT using that account as a payer.
    const { uri } = yield mx.nfts().uploadMetadata({ name: 'My NFT' });
    const { nft } = yield mx.nfts().create({ uri, payer });
    // Then the payer has less lamports than it used to.
    t.ok((yield mx.connection.getBalance(payer.publicKey)) < 1000000000);
    // And the identity did not lose any lamports.
    t.equal(yield mx.connection.getBalance(mx.identity().publicKey), initialIdentityBalance);
    // And the NFT was successfully created.
    (0, spok_1.default)(t, nft, {
        $topic: 'nft',
        name: 'My NFT',
    });
}));
(0, tape_1.default)('it can create an NFT for other signer wallets without using the identity', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And a bunch of wallet used instead of the identity.
    const payer = web3_js_1.Keypair.generate();
    const mintAuthority = web3_js_1.Keypair.generate();
    const updateAuthority = web3_js_1.Keypair.generate();
    const owner = web3_js_1.Keypair.generate();
    yield helpers_1.amman.airdrop(mx.connection, payer.publicKey, 1);
    // When we create a new NFT using these accounts.
    const { uri } = yield mx.nfts().uploadMetadata({ name: 'My NFT' });
    const { nft } = yield mx.nfts().create({
        uri,
        payer,
        mintAuthority,
        updateAuthority,
        owner: owner.publicKey,
    });
    // Then the NFT was successfully created and assigned to the right wallets.
    (0, spok_1.default)(t, nft, {
        $topic: 'nft',
        name: 'My NFT',
        updateAuthority: (0, helpers_1.spokSamePubkey)(updateAuthority.publicKey),
    });
}));
(0, tape_1.default)('it can create an NFT with an invalid URI', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // When we create an NFT with an invalid URI.
    const { nft } = yield mx.nfts().create({
        name: 'My NFT with an invalid URI',
        uri: 'https://example.com/some/invalid/uri',
    });
    // Then the NFT was created successfully.
    t.equal(nft.name, 'My NFT with an invalid URI');
    t.equal(nft.uri, 'https://example.com/some/invalid/uri');
    // But its metadata is empty.
    t.same(nft.metadata, {});
    t.equals(nft.metadataTask.getStatus(), 'failed');
}));
//# sourceMappingURL=createNft.test.js.map