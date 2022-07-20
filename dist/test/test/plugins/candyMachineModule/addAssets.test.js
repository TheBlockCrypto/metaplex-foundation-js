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
const src_1 = require("../../../src");
const helpers_2 = require("./helpers");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('addAssets: candy machine that can hold 7 assets', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holing 7 assets
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 7);
    {
        // When I add one asset
        t.comment('Adding one asset');
        const { transactionId } = yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [{ name: 'first asset', uri: 'first uri' }],
        });
        yield helpers_1.amman.addr.addLabel('cm(7)-add first asset', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine has the asset added
        const candyMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        (0, spok_1.default)(t, candyMachine, {
            assets: [
                {
                    name: spok_1.default.startsWith('first asset'),
                    uri: spok_1.default.startsWith('first uri'),
                },
            ],
        });
    }
    {
        // When I add two more assets
        t.comment('Adding two more assets');
        const { transactionId } = yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'second asset', uri: 'second uri' },
                { name: 'third asset', uri: 'third uri' },
            ],
        });
        yield helpers_1.amman.addr.addLabel('cm(7)-add two more assets', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine has the assets added
        const candyMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        (0, spok_1.default)(t, candyMachine, {
            assets: [
                {
                    name: spok_1.default.startsWith('first asset'),
                    uri: spok_1.default.startsWith('first uri'),
                },
                {
                    name: spok_1.default.startsWith('second asset'),
                    uri: spok_1.default.startsWith('second uri'),
                },
                {
                    name: spok_1.default.startsWith('third asset'),
                    uri: spok_1.default.startsWith('third uri'),
                },
            ],
        });
    }
    {
        // When I add four more assets
        t.comment('Adding four more assets');
        const { transactionId } = yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'fourth asset', uri: 'fourth uri' },
                { name: 'fifth asset', uri: 'fifth uri' },
                { name: 'sixth asset', uri: 'sixth uri' },
                { name: 'seventh asset', uri: 'seventh uri' },
            ],
        });
        yield helpers_1.amman.addr.addLabel('cm(7)-add four more assets', transactionId);
        // Then the transaction succeeds
        yield tc.assertSuccess(t, transactionId);
        // And the candy machine has the assets added
        const candyMachine = yield mx
            .candyMachines()
            .findByAddress(candyMachineSigner.publicKey);
        (0, spok_1.default)(t, candyMachine, {
            assets: [
                {
                    name: spok_1.default.startsWith('first asset'),
                    uri: spok_1.default.startsWith('first uri'),
                },
                {
                    name: spok_1.default.startsWith('second asset'),
                    uri: spok_1.default.startsWith('second uri'),
                },
                {
                    name: spok_1.default.startsWith('third asset'),
                    uri: spok_1.default.startsWith('third uri'),
                },
                {
                    name: spok_1.default.startsWith('fourth asset'),
                    uri: spok_1.default.startsWith('fourth uri'),
                },
                {
                    name: spok_1.default.startsWith('fifth asset'),
                    uri: spok_1.default.startsWith('fifth uri'),
                },
                {
                    name: spok_1.default.startsWith('sixth asset'),
                    uri: spok_1.default.startsWith('sixth uri'),
                },
                {
                    name: spok_1.default.startsWith('seventh asset'),
                    uri: spok_1.default.startsWith('seventh uri'),
                },
            ],
        });
    }
}));
(0, tape_1.default)('addAssets: candy machine that can hold 0 assets adding one', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holding 0
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 0);
    // When I add one asset
    t.comment('Adding one asset');
    try {
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [{ name: 'first asset', uri: 'first uri' }],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        // Then the request fails
        t.ok(err instanceof src_1.CandyMachineIsFullError, 'throws CandyMachineIsFullError');
    }
    // And the candy machine has no assets added
    const candyMachine = yield mx
        .candyMachines()
        .findByAddress(candyMachineSigner.publicKey);
    t.equal(candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.assetsCount, 0, 'no assets added');
}));
(0, tape_1.default)('addAssets: candy machine that can hold 2 assets adding 5', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holding 4
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 4);
    // When I add five assets
    t.comment('Adding five assets');
    try {
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'first asset', uri: 'first uri' },
                { name: 'second asset', uri: 'second uri' },
                { name: 'third asset', uri: 'third uri' },
                { name: 'fourth asset', uri: 'fourth uri' },
                { name: 'fifth asset', uri: 'fifth uri' },
            ],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        t.ok(err instanceof src_1.CandyMachineCannotAddAmountError, 'throws CandyMachineCannotAddAmountError');
    }
    // And the candy machine has no assets added
    const candyMachine = yield mx
        .candyMachines()
        .findByAddress(candyMachineSigner.publicKey);
    t.equal(candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.assetsCount, 0, 'no assets added');
}));
(0, tape_1.default)('addAssets: candy machine that can hold 4 assets adding 3 and then 2', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holding 4
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 4);
    {
        // When I add three assets
        t.comment('Adding three assets');
        const { transactionId } = yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'first asset', uri: 'first uri' },
                { name: 'second asset', uri: 'second uri' },
                { name: 'third asset', uri: 'third uri' },
            ],
        });
        yield helpers_1.amman.addr.addLabel('cm(4)-add-three', transactionId);
        tc.assertSuccess(t, transactionId);
    }
    //
    // And then I add two more assets
    t.comment('Adding two more assets');
    try {
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'fourth asset', uri: 'fourth uri' },
                { name: 'fifth asset', uri: 'fifth uri' },
            ],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        t.ok(err instanceof src_1.CandyMachineCannotAddAmountError, 'throws CandyMachineCannotAddAmountError');
    }
    // And the candy machine has only the first three assets added
    const candyMachine = yield mx
        .candyMachines()
        .findByAddress(candyMachineSigner.publicKey);
    t.equal(candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.assetsCount, 3, 'first three assets added');
}));
(0, tape_1.default)('addAssets: candy machine that can hold 3 assets adding 3 and then 2', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holding 3
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 3);
    {
        // When I add three assets
        t.comment('Adding three assets');
        const { transactionId } = yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'first asset', uri: 'first uri' },
                { name: 'second asset', uri: 'second uri' },
                { name: 'third asset', uri: 'third uri' },
            ],
        });
        yield helpers_1.amman.addr.addLabel('cm(3)-add-three', transactionId);
        tc.assertSuccess(t, transactionId);
    }
    //
    // And then I add two more assets
    t.comment('Adding two more assets');
    try {
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'fourth asset', uri: 'fourth uri' },
                { name: 'fifth asset', uri: 'fifth uri' },
            ],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        t.ok(err instanceof src_1.CandyMachineIsFullError, 'throws CandyMachineIsFullError');
    }
    // And the candy machine has only the first three assets added
    const candyMachine = yield mx
        .candyMachines()
        .findByAddress(candyMachineSigner.publicKey);
    t.equal(candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.assetsCount, 3, 'first three assets added');
}));
(0, tape_1.default)('addAssets: fails when name or uri too long', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine holing 1 assets
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const { candyMachineSigner, payerSigner } = yield (0, helpers_2.createCandyMachineWithMaxSupply)(mx, 1);
    // When I add one asset with a name that is longer than 32 characters
    try {
        t.comment('Adding one asset with a name that is longer than 32 characters');
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                { name: 'asset - 012345678901234567890123456789', uri: 'first uri' },
            ],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        // Then it fails
        t.ok(err instanceof src_1.CandyMachineAddConfigConstraintsViolatedError, 'throws CandyMachineAddConfigConstraintsViolatedError');
    }
    //
    // When I add one asset with a uri that is longer than 200 characters
    try {
        t.comment('Adding one asset with a uri that is longer than 200 characters');
        yield cm.addAssets({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            assets: [
                {
                    name: 'asset',
                    uri: 'x'.repeat(201),
                },
            ],
        });
        t.fail('should have thrown');
    }
    catch (err) {
        // Then it fails
        t.ok(err instanceof src_1.CandyMachineAddConfigConstraintsViolatedError, 'throws CandyMachineAddConfigConstraintsViolatedError');
    }
}));
//# sourceMappingURL=addAssets.test.js.map