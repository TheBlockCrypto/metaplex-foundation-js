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
const src_1 = require("../../../src");
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
const helpers_3 = require("./helpers");
const bn_js_1 = __importDefault(require("bn.js"));
const amman_client_1 = require("@metaplex-foundation/amman-client");
(0, helpers_1.killStuckProcess)();
function verifyProperlyUploaded(t, mx, uri, asset, creators) {
    return __awaiter(this, void 0, void 0, function* () {
        const { image, properties } = yield mx.storage().downloadJson(uri);
        (0, spok_1.default)(t, properties.creators, creators.map((x) => (Object.assign(Object.assign({}, x), { address: x.address.toBase58(), share: new bn_js_1.default(x.share).toNumber() }))));
        const metaplexFile = yield mx.storage().download(image);
        t.ok(asset.buffer.equals(Buffer.from(metaplexFile.buffer)), 'asset.buffer === metaplexFile.buffer');
    });
}
function verifyUploadedAssets(t, mx, assets, uploadedAssets, creators) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const x of uploadedAssets) {
            const asset = assets.find((y) => y.displayName === x.name);
            t.ok(asset != null, 'asset was named correctly');
            yield verifyProperlyUploaded(t, mx, x.uri, asset, creators);
        }
    });
}
function setupMockStorage(mx) {
    if (process.env.CI == null) {
        mx.use((0, amman_client_1.ammanMockStorage)(helpers_1.MOCK_STORAGE_ID));
    }
    else {
        mx.use((0, src_1.mockStorage)());
    }
}
(0, tape_1.default)('uploadAsset: candy machine that can hold 2 assets', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holing 2 assets
    const mx = yield (0, helpers_1.metaplex)();
    setupMockStorage(mx);
    const cm = mx.candyMachines();
    const { candyMachine, candyMachineSigner, payerSigner } = yield (0, helpers_3.createCandyMachineWithMaxSupply)(mx, 2);
    // When I upload one asset for it
    const asset = (0, src_1.useMetaplexFile)(helpers_2.rockPng, 'rock.png');
    const { uri, addAssetsTransactionId } = yield cm.uploadAssetForCandyMachine({
        authoritySigner: payerSigner,
        candyMachineAddress: candyMachineSigner.publicKey,
        metadata: {
            image: asset,
        },
    });
    // Then the asset is uploaded properly
    yield verifyProperlyUploaded(t, mx, uri, asset, candyMachine.creators);
    // And the asset is not added to the candy machine
    const updatedCm = yield cm.findByAddress(candyMachine.candyMachineAddress);
    t.ok(addAssetsTransactionId == null, 'did not add asset to candy machine');
    t.equal(updatedCm === null || updatedCm === void 0 ? void 0 : updatedCm.assetsCount, 0, 'candy machine has 1 asset');
}));
(0, tape_1.default)('uploadAsset: candy machine that can hold 2 assets add three assets one at a time', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Given I create a candy machine that can hold 2 assets
    const mx = yield (0, helpers_1.metaplex)();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    setupMockStorage(mx);
    const cm = mx.candyMachines();
    const { candyMachine, candyMachineSigner, payerSigner } = yield (0, helpers_3.createCandyMachineWithMaxSupply)(mx, 2);
    {
        // When I upload the first asset for it
        t.comment('uploading first asset');
        const asset = (0, src_1.useMetaplexFile)(helpers_2.rockPng, 'rock.png');
        const { uri, metadata } = yield cm.uploadAssetForCandyMachine({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            metadata: {
                image: asset,
            },
        });
        // Then the asset is uploaded properly
        yield verifyProperlyUploaded(t, mx, uri, asset, candyMachine.creators);
        // And I can add the asset to the candy machine
        const { transactionId } = yield cm.addAssets({
            candyMachineAddress: candyMachineSigner.publicKey,
            authoritySigner: payerSigner,
            assets: [
                {
                    uri,
                    name: (_a = metadata.name) !== null && _a !== void 0 ? _a : asset.displayName,
                },
            ],
        });
        yield tc.assertSuccess(t, transactionId);
        t.equal((_b = (yield cm.findByAddress(candyMachine.candyMachineAddress))) === null || _b === void 0 ? void 0 : _b.assetsCount, 1, 'candy machine has 1 asset');
    }
    {
        // When I upload the second asset for it
        t.comment('uploading second asset');
        const asset = (0, src_1.useMetaplexFile)(helpers_2.benchPng, 'bench.png');
        const { uri, metadata } = yield cm.uploadAssetForCandyMachine({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            metadata: {
                image: asset,
            },
        });
        // Then the asset is uploaded properly
        yield verifyProperlyUploaded(t, mx, uri, asset, candyMachine.creators);
        // And I can add the asset to the candy machine
        const { transactionId } = yield cm.addAssets({
            candyMachineAddress: candyMachineSigner.publicKey,
            authoritySigner: payerSigner,
            assets: [
                {
                    uri,
                    name: (_c = metadata.name) !== null && _c !== void 0 ? _c : asset.displayName,
                },
            ],
        });
        yield tc.assertSuccess(t, transactionId);
        t.equal((_d = (yield cm.findByAddress(candyMachine.candyMachineAddress))) === null || _d === void 0 ? void 0 : _d.assetsCount, 2, 'candy machine has 2 assets');
    }
    {
        // When I upload the third asset for it
        t.comment('uploading third asset');
        const asset = (0, src_1.useMetaplexFile)(helpers_2.walrusPng, 'walrus.png');
        try {
            yield cm.uploadAssetForCandyMachine({
                authoritySigner: payerSigner,
                candyMachineAddress: candyMachineSigner.publicKey,
                metadata: {
                    image: asset,
                },
            });
            t.fail('should throw');
        }
        catch (err) {
            // Then it fails because the candy machine is full
            t.ok(err instanceof src_1.CandyMachineIsFullError, 'throws CandyMachineIsFullError');
        }
    }
}));
(0, tape_1.default)('uploadAndAddAsset: candy machine that can hold 2 assets upload one', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holding 2 assets
    const mx = yield (0, helpers_1.metaplex)();
    setupMockStorage(mx);
    const cm = mx.candyMachines();
    const { candyMachine, candyMachineSigner, payerSigner } = yield (0, helpers_3.createCandyMachineWithMaxSupply)(mx, 2);
    // When I upload one asset for it and have it added to the candy machine
    const asset = (0, src_1.useMetaplexFile)(helpers_2.rockPng, 'rock.png');
    const { uri, addAssetsTransactionId } = yield cm.uploadAssetForCandyMachine({
        authoritySigner: payerSigner,
        candyMachineAddress: candyMachineSigner.publicKey,
        metadata: {
            image: asset,
        },
        addToCandyMachine: true,
    });
    // Then the asset is uploaded properly
    yield verifyProperlyUploaded(t, mx, uri, asset, candyMachine.creators);
    // And the asset is added to the candy machine
    const updatedCm = yield cm.findByAddress(candyMachine.candyMachineAddress);
    t.ok(addAssetsTransactionId != null, 'did add asset to candy machine');
    t.equal(updatedCm === null || updatedCm === void 0 ? void 0 : updatedCm.assetsCount, 1, 'candy machine has 1 asset');
}));
// -----------------
// upload multiple
// -----------------
const assets = [
    (0, src_1.useMetaplexFile)(helpers_2.rockPng, 'rock.png', { displayName: 'rock' }),
    (0, src_1.useMetaplexFile)(helpers_2.bridgePng, 'bridge.png', {
        displayName: 'bridge',
    }),
    (0, src_1.useMetaplexFile)(helpers_2.benchPng, 'bench.png', { displayName: 'bench' }),
    (0, src_1.useMetaplexFile)(helpers_2.walrusPng, 'walrus.png', {
        displayName: 'Creature of the sea',
    }),
];
(0, tape_1.default)('uploadAndAddAssets: candy machine that can hold 4 assets upload 4 and add', (t) => __awaiter(void 0, void 0, void 0, function* () {
    for (const parallel of [false, true]) {
        t.comment(`Uploading ${parallel ? 'in parallel' : 'sequentially'}`);
        // Given I create a candy machine holding 4 assets
        const mx = yield (0, helpers_1.metaplex)();
        setupMockStorage(mx);
        const cm = mx.candyMachines();
        const { candyMachine, candyMachineSigner, payerSigner } = yield (0, helpers_3.createCandyMachineWithMaxSupply)(mx, 4);
        // When I upload 4 assets to it sequentially and have it added to the candy machine
        const { addAssetsTransactionId, uploadedAssets } = yield cm.uploadAssetsForCandyMachine({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: assets,
            addToCandyMachine: true,
        });
        yield helpers_1.amman.addr.addLabel(addAssetsTransactionId, 'tx: upload+add 4 assets sequentially');
        // Then the asset is uploaded properly
        t.ok(addAssetsTransactionId != null, 'run transaction to add assets to candy machine');
        yield verifyUploadedAssets(t, mx, assets, uploadedAssets, candyMachine.creators);
        // And the asset is added to the candy machine
        const updatedCm = yield cm.findByAddress(candyMachine.candyMachineAddress);
        t.ok(addAssetsTransactionId != null, 'did add assets to candy machine');
        t.equal(updatedCm === null || updatedCm === void 0 ? void 0 : updatedCm.assetsCount, 4, 'candy machine has 4 assets');
    }
}));
//# sourceMappingURL=uploadAssets.test.js.map