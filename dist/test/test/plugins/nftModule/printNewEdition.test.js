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
const helpers_1 = require("../../helpers");
const spok_1 = __importDefault(require("spok"));
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('it can print a new edition from an original edition', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Given an existing Original NFT.
    const mx = yield (0, helpers_1.metaplex)();
    const originalNft = yield (0, helpers_1.createNft)(mx, {
        name: 'Original Nft Name',
        description: 'Original Nft Description',
    }, {
        name: 'Original Nft On-Chain Name',
        maxSupply: 100,
    });
    // When we print a new edition of the NFT.
    const { nft: printNft } = yield mx.nfts().printNewEdition(originalNft.mint);
    // Then we created and returned the printed NFT with the right data.
    const expectedNft = {
        name: 'Original Nft On-Chain Name',
        metadata: {
            name: 'Original Nft Name',
            description: 'Original Nft Description',
        },
        printEdition: {
            parent: (0, helpers_1.spokSamePubkey)((_b = (_a = originalNft.editionAccount) === null || _a === void 0 ? void 0 : _a.publicKey) !== null && _b !== void 0 ? _b : null),
            edition: (0, helpers_1.spokSameBignum)(1),
        },
    };
    (0, spok_1.default)(t, printNft, Object.assign({ $topic: 'nft' }, expectedNft));
    // And the data was stored in the blockchain.
    const retrievedNft = yield mx.nfts().findByMint(printNft.mint);
    (0, spok_1.default)(t, retrievedNft, Object.assign({ $topic: 'Retrieved Nft' }, expectedNft));
}));
(0, tape_1.default)('it keeps track of the edition number', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given an existing Original NFT.
    const mx = yield (0, helpers_1.metaplex)();
    const originalNft = yield (0, helpers_1.createNft)(mx, {}, { maxSupply: 100 });
    // When we print 3 new editions of the NFT.
    const { nft: printNft1 } = yield mx.nfts().printNewEdition(originalNft.mint);
    const { nft: printNft2 } = yield mx.nfts().printNewEdition(originalNft.mint);
    const { nft: printNft3 } = yield mx.nfts().printNewEdition(originalNft.mint);
    // Then each edition knows their number and are associated with the same parent.
    isPrintOfOriginal(t, printNft1, originalNft, 1);
    isPrintOfOriginal(t, printNft2, originalNft, 2);
    isPrintOfOriginal(t, printNft3, originalNft, 3);
}));
(0, tape_1.default)('it can print unlimited editions', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given an existing Original NFT with no explicit maxSupply.
    const mx = yield (0, helpers_1.metaplex)();
    const originalNft = yield (0, helpers_1.createNft)(mx);
    // When we print an edition of the NFT.
    const { nft: printNft } = yield mx.nfts().printNewEdition(originalNft.mint);
    // Then we successfully printed the first NFT of an unlimited collection.
    isPrintOfOriginal(t, printNft, originalNft, 1);
}));
(0, tape_1.default)('it cannot print when the maxSupply is zero', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given an existing Original NFT with a maxSupply of zero.
    const mx = yield (0, helpers_1.metaplex)();
    const originalNft = yield (0, helpers_1.createNft)(mx, {}, { maxSupply: 0 });
    try {
        // When we try to print an edition of the NFT.
        yield mx.nfts().printNewEdition(originalNft.mint);
        t.fail('The NFT should not have printed');
    }
    catch (error) {
        // Then we should get an error.
        t.ok(error, 'got an error');
        // TODO: Assert on the right error when  integrated with Cusper.
    }
}));
const isPrintOfOriginal = (t, print, original, edition) => {
    var _a, _b;
    (0, spok_1.default)(t, print, {
        $topic: 'print NFT #' + edition,
        printEdition: {
            parent: (0, helpers_1.spokSamePubkey)((_b = (_a = original.editionAccount) === null || _a === void 0 ? void 0 : _a.publicKey) !== null && _b !== void 0 ? _b : null),
            edition: (0, helpers_1.spokSameBignum)(edition),
        },
    });
};
//# sourceMappingURL=printNewEdition.test.js.map