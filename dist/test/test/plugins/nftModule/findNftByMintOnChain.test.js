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
const web3_js_1 = require("@solana/web3.js");
const tape_1 = __importDefault(require("tape"));
const helpers_1 = require("../../helpers");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('it can fetch an NFT by its mint address', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given a metaplex instance and an existing NFT.
    const mx = yield (0, helpers_1.metaplex)();
    const mint = web3_js_1.Keypair.generate();
    const nft = yield (0, helpers_1.createNft)(mx, { name: 'Some NFT' }, { mint });
    // When we fetch that NFT using its mint address.
    const fetchedNft = yield mx.nfts().findByMint(mint.publicKey);
    // Then we get the right NFT.
    t.true(fetchedNft.equals(nft));
}));
(0, tape_1.default)('it can fetch an NFT with an invalid URI', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given an existing NFT with an invalid URI.
    const mx = yield (0, helpers_1.metaplex)();
    const { nft } = yield mx.nfts().create({
        uri: 'https://example.com/some/invalid/uri',
    });
    // When we fetch that NFT using its mint address.
    const fetchedNft = yield mx.nfts().findByMint(nft.mint);
    // Then we get the right NFT.
    t.true(fetchedNft.equals(nft));
    // And its metadata is empty.
    t.same(fetchedNft.metadata, {});
    t.equals(fetchedNft.metadataTask.getStatus(), 'failed');
}));
//# sourceMappingURL=findNftByMintOnChain.test.js.map