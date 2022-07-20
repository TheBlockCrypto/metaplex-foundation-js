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
(0, helpers_1.killStuckProcess)();
// -----------------
// Wallet
// -----------------
(0, tape_1.default)('candyMachineGPA: candyMachineAccountsForWallet for wallet with one candy machine created', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine with a wallet
    const mx = yield (0, helpers_1.metaplex)();
    const { candyMachineSigner, authorityAddress, walletAddress } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    // When I get the candy machines for the wallet
    const candyMachines = yield mx.candyMachines().findAllByWallet(walletAddress);
    // It returns that candy machine
    t.equal(candyMachines.length, 1, 'returns one account');
    const cm = candyMachines[0];
    (0, spok_1.default)(t, cm, {
        $topic: 'candyMachine',
        authorityAddress: (0, helpers_1.spokSamePubkey)(authorityAddress),
        walletAddress: (0, helpers_1.spokSamePubkey)(walletAddress),
    });
    t.ok(candyMachineSigner.publicKey.toBase58().startsWith(cm.uuid), 'candy machine uuid matches candyMachineSigner');
}));
(0, tape_1.default)('candyMachineGPA: candyMachineAccountsForWallet for wallet with two candy machines created for that wallet and one for another', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create one candy machine with wallet1 and two with wallet2
    // Other wallet
    {
        const mx = yield (0, helpers_1.metaplex)();
        yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    }
    const mx = yield (0, helpers_1.metaplex)();
    // This wallet
    {
        yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
        yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    }
    // When I get the candy machines for the wallet
    const candyMachines = yield mx
        .candyMachines()
        .findAllByWallet(mx.identity().publicKey);
    // It returns the two candy machine of wallet2
    t.equal(candyMachines.length, 2, 'returns two machines');
    for (const cm of candyMachines) {
        t.ok(cm.walletAddress.equals(mx.identity().publicKey), 'wallet matches');
    }
}));
// -----------------
// Authority
// -----------------
(0, tape_1.default)('candyMachineGPA: candyMachineAccountsForAuthority for authority with one candy machine created', (t) => __awaiter(void 0, void 0, void 0, function* () {
    // Given I create a candy machine with a specific auhority
    const mx = yield (0, helpers_1.metaplex)();
    const { candyMachineSigner, authorityAddress, walletAddress } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
    // When I get the candy machines for that authority
    const candyMachines = yield mx
        .candyMachines()
        .findAllByAuthority(authorityAddress);
    // It returns that one candy machine for that authority
    t.equal(candyMachines.length, 1, 'returns one account');
    const cm = candyMachines[0];
    (0, spok_1.default)(t, cm, {
        $topic: 'candyMachine',
        authorityAddress: (0, helpers_1.spokSamePubkey)(authorityAddress),
        walletAddress: (0, helpers_1.spokSamePubkey)(walletAddress),
    });
    t.ok(candyMachineSigner.publicKey.toBase58().startsWith(cm.uuid), 'candy machine uuid matches candyMachineSigner');
}));
//# sourceMappingURL=findCandyMachinesByPublicKeyField.test.js.map