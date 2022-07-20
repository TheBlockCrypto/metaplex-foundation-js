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
const src_1 = require("../../../src");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('update: candy machine authority to new authority', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const tc = helpers_1.amman.transactionChecker(mx.connection);
    const { candyMachineSigner, payerSigner, walletAddress } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    const [newAuthorityAddress] = yield helpers_1.amman.genLabeledKeypair('newAuthority');
    // When I update that candy machine's authority
    const { transactionId } = yield cm.updateAuthority({
        authoritySigner: payerSigner,
        candyMachineAddress: candyMachineSigner.publicKey,
        walletAddress,
        newAuthorityAddress,
    });
    yield helpers_1.amman.addr.addLabel(`tx: update-cm-authority`, transactionId);
    // Then the transaction succeeds
    yield tc.assertSuccess(t, transactionId);
    // And the candy machine authority is updated
    const updatedMachine = yield mx
        .candyMachines()
        .findByAddress(candyMachineSigner.publicKey);
    (0, spok_1.default)(t, updatedMachine, {
        authorityAddress: (0, helpers_1.spokSamePubkey)(newAuthorityAddress),
    });
}));
(0, tape_1.default)('update: candy machine authority to same authority', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine
    const mx = yield (0, helpers_1.metaplex)();
    const cm = mx.candyMachines();
    const { candyMachineSigner, payerSigner, walletAddress } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    // When I update that candy machine's authority
    try {
        yield cm.updateAuthority({
            authoritySigner: payerSigner,
            candyMachineAddress: candyMachineSigner.publicKey,
            walletAddress,
            newAuthorityAddress: payerSigner.publicKey,
        });
        t.fail('should have thrown');
    }
    catch (err) {
        // Then the transaction doesn't run and an error is thrown instead
        t.ok(err instanceof src_1.CandyMachineAlreadyHasThisAuthorityError, 'throws CandyMachineAlreadyHasThisAuthorityError');
    }
}));
//# sourceMappingURL=updateAuthority.test.js.map