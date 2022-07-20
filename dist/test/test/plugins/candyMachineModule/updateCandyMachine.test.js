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
const helpers_1 = require("../../helpers");
const helpers_2 = require("./helpers");
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
(0, helpers_1.killStuckProcess)();
function assertProperlyUpdatedScalars(t, createdCandyMachine, updatedCandyMachine, expectedChanges) {
    const expected = Object.assign(Object.assign({}, createdCandyMachine), expectedChanges);
    (0, spok_1.default)(t, updatedCandyMachine, {
        uuid: expected.uuid,
        price: (0, helpers_1.spokSameBignum)(expected.price),
        symbol: expected.symbol,
        sellerFeeBasisPoints: expected.sellerFeeBasisPoints,
        maxSupply: (0, helpers_1.spokSameBignum)(expected.maxSupply),
        isMutable: expected.isMutable,
        retainAuthority: expected.retainAuthority,
        goLiveDate: (0, helpers_1.spokSameBignum)(expected.goLiveDate),
        itemsAvailable: expected.itemsAvailable,
    });
}
(0, tape_1.default)('update: candy machine single property', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    const changes = [
        ['uuid', 'new-uuid'],
        ['price', 333],
        ['symbol', 'NEW'],
        ['sellerFeeBasisPoints', 555],
        ['isMutable', true],
        ['retainAuthority', false],
        ['goLiveDate', new Date('2022-02-02').valueOf()],
    ];
    let currentCandyMachine = candyMachine;
    for (const [key, value] of changes) {
        t.comment(`Updating ${key}`);
        // When I update that candy machine's property
        const { transactionId } = yield cm.update({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            walletAddress,
            [key]: value,
        });
        yield helpers_1.amman.addr.addLabel(`tx: update-cm-${key}`, transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        t.ok(updatedMachine != null, 'finds updated machine');
        assertProperlyUpdatedScalars(t, currentCandyMachine, updatedMachine, {
            [key]: value,
        });
        currentCandyMachine = updatedMachine;
    }
}));
(0, tape_1.default)('update: candy machine multiple scalar properties', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    const changes = [
        // first half
        [
            ['uuid', 'new-uuid'],
            ['price', 333],
            ['symbol', 'NEW'],
        ],
        // second half
        [
            ['sellerFeeBasisPoints', 555],
            ['isMutable', true],
            ['retainAuthority', false],
            ['goLiveDate', new Date('2022-02-02').valueOf()],
        ],
        // all
        [
            ['uuid', 'new-uuid'],
            ['price', 333],
            ['symbol', 'NEW'],
            ['sellerFeeBasisPoints', 555],
            ['isMutable', true],
            ['retainAuthority', false],
            ['goLiveDate', new Date('2022-02-02').valueOf()],
        ],
    ];
    let currentCandyMachine = candyMachine;
    for (const changeSet of changes) {
        const keys = changeSet.map(([key]) => key);
        const keyValues = changeSet.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        t.comment(`Updating ${keys.join(', ')}`);
        // When I update that candy machine's property
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, keyValues));
        yield helpers_1.amman.addr.addLabel(`tx: update-cm-${keys.join(', ')}`, transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        t.ok(updatedMachine != null, 'finds updated machine');
        const expectedChanges = changeSet.reduce((acc, [key, val]) => {
            acc[key] =
                val;
            return acc;
        }, {});
        assertProperlyUpdatedScalars(t, currentCandyMachine, updatedMachine, expectedChanges);
        currentCandyMachine = updatedMachine;
    }
}));
// -----------------
// End Settings
// -----------------
(0, tape_1.default)('update: candy machine end settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    // Given I create one candy machine without end settings
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    {
        // When I add that candy machine's end settings
        t.comment('adding settings');
        const changes = {
            endSettings: {
                endSettingType: mpl_candy_machine_1.EndSettingType.Date,
                number: new Date('25 Jan 2022 00:00:00 GMT').valueOf(),
            },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: add-cm-end-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.endSettings, {
            endSettingType: (_a = changes.endSettings) === null || _a === void 0 ? void 0 : _a.endSettingType,
            number: (0, helpers_1.spokSameBignum)((_b = changes.endSettings) === null || _b === void 0 ? void 0 : _b.number),
        });
    }
    {
        // When I then change the settings
        t.comment('changing settings');
        const changes = {
            endSettings: {
                endSettingType: mpl_candy_machine_1.EndSettingType.Date,
                number: new Date('25 Feb 2022 01:02:03 GMT').valueOf(),
            },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: update-cm-end-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings re-configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.endSettings, {
            endSettingType: (_c = changes.endSettings) === null || _c === void 0 ? void 0 : _c.endSettingType,
            number: (0, helpers_1.spokSameBignum)((_d = changes.endSettings) === null || _d === void 0 ? void 0 : _d.number),
        });
    }
    {
        // When I then remove the settings
        t.comment('removing settings');
        const changes = {
            endSettings: undefined,
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: remove-cm-end-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings removed
        t.ok((updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.endSettings) == null, 'end settings undefined');
    }
}));
// -----------------
// Hidden Settings
// -----------------
// TODO(thlorenz): add these tests once the program correctly handles these settings
// -----------------
// Gatekeeper Settings
// -----------------
(0, tape_1.default)('update: candy machine gatekeeper settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    // Given I create one candy machine without gatekeeper settings
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    {
        const [gateKeeper] = yield helpers_1.amman.genLabeledKeypair('added-gateKeeper');
        // When I add gatekeeper settings to that candy machine
        t.comment('adding settings');
        const changes = {
            gatekeeper: { expireOnUse: true, gatekeeperNetwork: gateKeeper },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: add-cm-gatekeeper-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.gatekeeper, {
            expireOnUse: (_e = changes.gatekeeper) === null || _e === void 0 ? void 0 : _e.expireOnUse,
            gatekeeperNetwork: (0, helpers_1.spokSamePubkey)((_f = changes.gatekeeper) === null || _f === void 0 ? void 0 : _f.gatekeeperNetwork),
        });
    }
    {
        const [gateKeeper] = yield helpers_1.amman.genLabeledKeypair('changed-gateKeeper');
        // When I then change the settings
        t.comment('changing settings');
        const changes = {
            gatekeeper: { expireOnUse: false, gatekeeperNetwork: gateKeeper },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: update-cm-gatekeeper-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings re-configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.gatekeeper, {
            expireOnUse: (_g = changes.gatekeeper) === null || _g === void 0 ? void 0 : _g.expireOnUse,
            gatekeeperNetwork: (0, helpers_1.spokSamePubkey)((_h = changes.gatekeeper) === null || _h === void 0 ? void 0 : _h.gatekeeperNetwork),
        });
    }
    {
        // When I then remove the settings
        t.comment('removing settings');
        const changes = {
            gatekeeper: undefined,
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: remove-cm-gatekeeper-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings removed
        t.ok((updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.gatekeeper) == null, 'gatekeeper settings undefined');
    }
}));
// -----------------
// WhitelistMint Settings
// -----------------
(0, tape_1.default)('update: candy machine whitelist mint settings', (t) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p, _q, _r;
    // Given I create one candy machine without whitelist mint settings
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    {
        const [mint] = yield helpers_1.amman.genLabeledKeypair('added-mint');
        // When I add whitelist mint settings to that candy machine
        t.comment('adding settings');
        const changes = {
            whitelistMintSettings: {
                mode: mpl_candy_machine_1.WhitelistMintMode.BurnEveryTime,
                discountPrice: 5,
                mint,
                presale: false,
            },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: add-cm-whitelist-mint-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.whitelistMintSettings, {
            mode: (_j = changes.whitelistMintSettings) === null || _j === void 0 ? void 0 : _j.mode,
            discountPrice: (0, helpers_1.spokSameBignum)((_k = changes.whitelistMintSettings) === null || _k === void 0 ? void 0 : _k.discountPrice),
            mint: (_l = changes.whitelistMintSettings) === null || _l === void 0 ? void 0 : _l.mint,
            presale: (_m = changes.whitelistMintSettings) === null || _m === void 0 ? void 0 : _m.presale,
        });
    }
    {
        const [mint] = yield helpers_1.amman.genLabeledKeypair('changed-mint');
        // When I then change the settings
        t.comment('changing settings');
        const changes = {
            whitelistMintSettings: {
                mode: mpl_candy_machine_1.WhitelistMintMode.NeverBurn,
                discountPrice: 8,
                mint,
                presale: true,
            },
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: update-cm-whitelist-mint-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings re-configured
        (0, spok_1.default)(t, updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.whitelistMintSettings, {
            mode: (_o = changes.whitelistMintSettings) === null || _o === void 0 ? void 0 : _o.mode,
            discountPrice: (0, helpers_1.spokSameBignum)((_p = changes.whitelistMintSettings) === null || _p === void 0 ? void 0 : _p.discountPrice),
            mint: (_q = changes.whitelistMintSettings) === null || _q === void 0 ? void 0 : _q.mint,
            presale: (_r = changes.whitelistMintSettings) === null || _r === void 0 ? void 0 : _r.presale,
        });
    }
    {
        // When I then remove the settings
        t.comment('removing settings');
        const changes = {
            whitelistMintSettings: undefined,
        };
        const { transactionId } = yield cm.update(Object.assign({ authoritySigner: payerSigner, candyMachineAddress: candyMachineSigner.publicKey, walletAddress }, changes));
        yield helpers_1.amman.addr.addLabel('tx: remove-cm-whitelist-mint-settings', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine is updated
        const updatedMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        // with scalar values unchanged
        assertProperlyUpdatedScalars(t, candyMachine, updatedMachine, {});
        // and settings removed
        t.ok((updatedMachine === null || updatedMachine === void 0 ? void 0 : updatedMachine.whitelistMintSettings) == null, 'whitelist mint settings undefined');
    }
}));
//# sourceMappingURL=updateCandyMachine.test.js.map