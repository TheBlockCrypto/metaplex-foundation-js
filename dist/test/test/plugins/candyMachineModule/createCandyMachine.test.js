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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const spok_1 = __importDefault(require("spok"));
const web3_js_1 = require("@solana/web3.js");
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const helpers_1 = require("../../helpers");
const config_1 = require("../../../src/plugins/candyMachineModule/config");
const helpers_2 = require("./helpers");
(0, helpers_1.killStuckProcess)();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const mx = yield (0, helpers_1.metaplex)();
        const tc = helpers_1.amman.transactionChecker(mx.connection);
        const payer = mx.identity();
        const solTreasuryAccount = web3_js_1.Keypair.generate();
        yield helpers_1.amman.airdrop(mx.connection, solTreasuryAccount.publicKey, 100);
        const minimalConfig = {
            price: 1.0,
            number: 10,
            sellerFeeBasisPoints: 0,
            solTreasuryAccount: solTreasuryAccount.publicKey.toBase58(),
            goLiveDate: '25 Dec 2021 00:00:00 GMT',
            retainAuthority: true,
            isMutable: false,
        };
        const opts = { confirmOptions: helpers_1.SKIP_PREFLIGHT };
        yield helpers_1.amman.addr.addLabels(Object.assign(Object.assign({}, minimalConfig), { payer }));
        const cm = mx.candyMachines();
        return { tc, cm, payer, solTreasuryAccount, minimalConfig, opts };
    });
}
function assertProperlyInitialized(t, candyMachine, { candyMachineSigner, payerSigner: _, walletAddress: wallet, authorityAddress: authority, price, sellerFeeBasisPoints, number, isMutable, retainAuthority, goLiveDate, tokenMintAddress: tokenMint, }) {
    (0, spok_1.default)(t, candyMachine.candyMachineAccount.data.pretty(), {
        $topic: 'candy machine',
        authority: authority.toBase58(),
        wallet: wallet.toBase58(),
        tokenMint,
        itemsRedeemed: (0, helpers_1.spokSameBignum)(0),
        data: {
            uuid: candyMachineSigner.publicKey.toBase58().slice(0, 6),
            price: (0, helpers_1.spokSameBignum)(price),
            sellerFeeBasisPoints: (0, helpers_1.spokSameBignum)(sellerFeeBasisPoints),
            maxSupply: (0, helpers_1.spokSameBignum)(number),
            itemsAvailable: (0, helpers_1.spokSameBignum)(number),
            isMutable,
            retainAuthority,
            goLiveDate: (0, helpers_1.spokSameBignum)(new Date(goLiveDate).valueOf()),
        },
    });
}
// -----------------
// Minimal Config
// -----------------
(0, tape_1.default)('candyMachine: init with minimal config', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we configure a Candy Machine
    const { tc, cm, solTreasuryAccount, minimalConfig, opts } = yield init();
    const config = minimalConfig;
    // When we create that Candy Machine
    const _a = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _a, rest = __rest(_a, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, helpers_2.assertCreators)(t, candyMachine.creators, (0, config_1.creatorsConfigDefault)(solTreasuryAccount.publicKey.toBase58()));
}));
(0, tape_1.default)('candyMachine: init with config specifying creators', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we configure a Candy Machine
    const { tc, cm, payer, minimalConfig, opts } = yield init();
    const [coCreator] = yield helpers_1.amman.genLabeledKeypair('coCreator');
    const creators = [
        {
            address: payer.publicKey.toBase58(),
            verified: false,
            share: 50,
        },
        {
            address: coCreator.toBase58(),
            verified: false,
            share: 50,
        },
    ];
    const config = Object.assign(Object.assign({}, minimalConfig), { creators });
    // When we create that Candy Machine
    const _b = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _b, rest = __rest(_b, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, helpers_2.assertCreators)(t, candyMachine.creators, config.creators);
}));
// -----------------
// End Settings
// -----------------
(0, tape_1.default)('candyMachine: init with end settings - amount', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    // Given we configure a Candy Machine
    const { tc, cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { endSettings: { endSettingType: 'amount', value: 100 } });
    // When we create that Candy Machine
    const _d = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _d, rest = __rest(_d, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, spok_1.default)(t, candyMachine.endSettings, {
        $topic: 'end settings',
        endSettingType: mpl_candy_machine_1.EndSettingType.Amount,
        number: (0, helpers_1.spokSameBignum)(new Date((_c = config.endSettings) === null || _c === void 0 ? void 0 : _c.value).valueOf()),
    });
}));
(0, tape_1.default)('candyMachine: init with end settings - date', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    // Given we configure a Candy Machine
    const { tc, cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { endSettings: { endSettingType: 'date', value: '25 Jan 2022 00:00:00 GMT' } });
    // When we create that Candy Machine
    const _f = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _f, rest = __rest(_f, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, spok_1.default)(t, candyMachine.endSettings, {
        $topic: 'end settings',
        endSettingType: mpl_candy_machine_1.EndSettingType.Date,
        number: (0, helpers_1.spokSameBignum)(new Date((_e = config.endSettings) === null || _e === void 0 ? void 0 : _e.value).valueOf()),
    });
}));
// -----------------
// Hidden Settings
// -----------------
(0, tape_1.default)('candyMachine: init with invalid hidden settings (hash too short)', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we configure a Candy Machine incorrectly
    const { cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { hiddenSettings: {
            hash: 'not 32-bit',
            uri: 'https://example.com',
            name: 'mint-name',
        } });
    // When we create that Candy Machine it fails
    yield (0, helpers_1.assertThrows)(t, () => cm.createFromConfig(config, opts), /len.+10.+should match len.+32/i);
}));
tape_1.default.skip('candyMachine: init with invalid hidden settings program error', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO(thlorenz): most likely due to incorrect account sizing when allocating candy machine,
    // Program log: panicked at 'index out of bounds: the len is 713 but the index is 3117', src/lib.rs:697:13
    // see: src/modules/candy-machine/models/candyMachineSpace.ts
    const { tc, cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { hiddenSettings: {
            hash: (0, helpers_1.hash32Bit)('cache-file..'),
            uri: 'https://example.com',
            name: 'mint-name',
        } });
    // When we create that Candy Machine
    const _g = yield cm.createFromConfig(config, opts), { transactionId, candyMachine } = _g, rest = __rest(_g, ["transactionId", "candyMachine"]);
    yield helpers_1.amman.addr.addLabel('initCandyMachine', transactionId);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { tokenMintAddress: null }));
}));
// -----------------
// Gatekeeper Settings
// -----------------
(0, tape_1.default)('candyMachine: with gatekeeper settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    // Given we configure a Candy Machine
    const [gateKeeper] = helpers_1.amman.genKeypair();
    const { tc, cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { gatekeeper: { expireOnUse: true, gatekeeperNetwork: gateKeeper.toBase58() } });
    // When we create that Candy Machine
    const _k = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _k, rest = __rest(_k, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, spok_1.default)(t, candyMachine.gatekeeper, {
        $topic: 'gatekeeper',
        expireOnUse: (_h = config.gatekeeper) === null || _h === void 0 ? void 0 : _h.expireOnUse,
        gatekeeperNetwork: (0, helpers_1.spokSamePubkey)((_j = config.gatekeeper) === null || _j === void 0 ? void 0 : _j.gatekeeperNetwork),
    });
}));
(0, tape_1.default)('candyMachine: with invalid gatekeeper settings (network not a public key)', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we configure a Candy Machine incorrectly
    const { cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { gatekeeper: { expireOnUse: true, gatekeeperNetwork: '<invalid>' } });
    // When we create that Candy Machine it fails
    yield (0, helpers_1.assertThrows)(t, () => cm.createFromConfig(config, opts), /not a valid PublicKey/i);
}));
// -----------------
// WhitelistMint Settings
// -----------------
(0, tape_1.default)('candyMachine: with whitelistMint settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o;
    // Given we configure a Candy Machine
    const [mint] = helpers_1.amman.genKeypair();
    const { tc, cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { whitelistMintSettings: {
            mode: 'burnEveryTime',
            discountPrice: 5,
            mint: mint.toBase58(),
            presale: false,
        } });
    // When we create that Candy Machine
    const _p = yield cm.createFromConfig(config, opts), { transactionId, candyMachine, candyMachineSigner } = _p, rest = __rest(_p, ["transactionId", "candyMachine", "candyMachineSigner"]);
    yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
    yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
    // Then we created the Candy Machine as configured
    yield tc.assertSuccess(t, transactionId);
    assertProperlyInitialized(t, candyMachine, Object.assign(Object.assign(Object.assign({}, rest), config), { candyMachineSigner, tokenMintAddress: null }));
    (0, spok_1.default)(t, candyMachine.whitelistMintSettings, {
        $topic: 'whitelist mint settings',
        mode: mpl_candy_machine_1.WhitelistMintMode.BurnEveryTime,
        discountPrice: (0, helpers_1.spokSameBignum)((_l = config.whitelistMintSettings) === null || _l === void 0 ? void 0 : _l.discountPrice),
        mint: (0, helpers_1.spokSamePubkey)((_m = config.whitelistMintSettings) === null || _m === void 0 ? void 0 : _m.mint),
        presale: (_o = config.whitelistMintSettings) === null || _o === void 0 ? void 0 : _o.presale,
    });
}));
(0, tape_1.default)('candyMachine: with invalid whitemint settings (mint not a public key)', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given we configure a Candy Machine incorrectly
    const { cm, minimalConfig, opts } = yield init();
    const config = Object.assign(Object.assign({}, minimalConfig), { whitelistMintSettings: {
            mode: 'burnEveryTime',
            discountPrice: 5,
            mint: '<invalid mint key>',
            presale: false,
        } });
    // When we create that Candy Machine it fails
    yield (0, helpers_1.assertThrows)(t, () => cm.createFromConfig(config, opts), /not a valid PublicKey/i);
}));
//# sourceMappingURL=createCandyMachine.test.js.map