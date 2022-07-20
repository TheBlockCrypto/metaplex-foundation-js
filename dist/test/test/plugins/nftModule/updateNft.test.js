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
const index_1 = require("../../../src/index");
const helpers_1 = require("../../helpers");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('it can update the on-chain data of an nft', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we have a Metaplex instance.
    const mx = yield (0, helpers_1.metaplex)();
    // And an existing NFT.
    const nft = yield (0, helpers_1.createNft)(mx, {
        name: 'JSON NFT name',
        description: 'JSON NFT description',
        image: (0, index_1.useMetaplexFile)('some image', 'some-image.jpg'),
    }, {
        name: 'On-chain NFT name',
        isMutable: true,
    });
    // And some new updated metadata that has been uploadeds.
    const { uri: updatedUri, metadata: updatedMetadata } = yield mx
        .nfts()
        .uploadMetadata({
        name: 'Updated JSON NFT name',
        description: 'Updated JSON NFT description',
        image: (0, index_1.useMetaplexFile)('updated image', 'updated-image.jpg'),
    });
    // When we update the NFT with new on-chain data.
    const { nft: updatedNft } = yield mx.nfts().update(nft, {
        name: 'Updated On-chain NFT name',
        primarySaleHappened: true,
        uri: updatedUri,
        isMutable: false,
    });
    // Then the returned NFT should have the updated data.
    (0, spok_1.default)(t, updatedNft, {
        $topic: 'update-nft',
        name: 'Updated On-chain NFT name',
        uri: updatedUri,
        metadata: {
            name: 'Updated JSON NFT name',
            description: 'Updated JSON NFT description',
            image: updatedMetadata.image,
        },
        primarySaleHappened: true,
    });
    // And the same goes if we try to fetch the NFT again.
    const foundUpdatedNft = yield mx.nfts().findByMint(nft.mint);
    (0, spok_1.default)(t, foundUpdatedNft, {
        $topic: 'check-downloaded-nft',
        name: 'Updated On-chain NFT name',
        uri: updatedUri,
        metadata: {
            name: 'Updated JSON NFT name',
            description: 'Updated JSON NFT description',
            image: updatedMetadata.image,
        },
        primarySaleHappened: true,
    });
}));
//# sourceMappingURL=updateNft.test.js.map