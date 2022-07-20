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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandyMachineWithMaxSupply = exports.createCandyMachineWithMinimalConfig = void 0;
const helpers_1 = require("../../../helpers");
/**
 * Creates a candy machine using the mx.identity as signer as well as
 * solTreasurySigner aka wallet.
 */
function createCandyMachineWithMinimalConfig(mx) {
    return __awaiter(this, void 0, void 0, function* () {
        const payer = mx.identity();
        const solTreasurySigner = payer;
        yield helpers_1.amman.airdrop(mx.connection, solTreasurySigner.publicKey, 100);
        const config = {
            price: 1.0,
            number: 10,
            sellerFeeBasisPoints: 0,
            solTreasuryAccount: solTreasurySigner.publicKey.toBase58(),
            goLiveDate: '25 Dec 2021 00:00:00 GMT',
            retainAuthority: true,
            isMutable: false,
        };
        const opts = { confirmOptions: helpers_1.SKIP_PREFLIGHT };
        yield helpers_1.amman.addr.addLabels(Object.assign(Object.assign({}, config), { payer }));
        const cm = mx.candyMachines();
        const { transactionId, confirmResponse, candyMachine, payerSigner, candyMachineSigner, authorityAddress, walletAddress, } = yield cm.createFromConfig(config, opts);
        yield helpers_1.amman.addr.addLabel('candy-machine', candyMachineSigner.publicKey);
        yield helpers_1.amman.addr.addLabel('tx: create candy-machine', transactionId);
        return {
            cm,
            transactionId,
            confirmResponse,
            candyMachine,
            config,
            solTreasurySigner,
            payerSigner,
            candyMachineSigner,
            authorityAddress,
            walletAddress,
        };
    });
}
exports.createCandyMachineWithMinimalConfig = createCandyMachineWithMinimalConfig;
function createCandyMachineWithMaxSupply(mx, number) {
    return __awaiter(this, void 0, void 0, function* () {
        const payer = mx.identity();
        const solTreasurySigner = payer;
        yield helpers_1.amman.airdrop(mx.connection, solTreasurySigner.publicKey, 100);
        const config = {
            price: 1.0,
            number,
            sellerFeeBasisPoints: 0,
            solTreasuryAccount: solTreasurySigner.publicKey.toBase58(),
            goLiveDate: '25 Dec 2021 00:00:00 GMT',
            retainAuthority: true,
            isMutable: false,
        };
        const opts = { confirmOptions: helpers_1.SKIP_PREFLIGHT };
        yield helpers_1.amman.addr.addLabels(Object.assign(Object.assign({}, config), { payer }));
        const cm = mx.candyMachines();
        const { transactionId, candyMachine, payerSigner, candyMachineSigner } = yield cm.createFromConfig(config, opts);
        yield helpers_1.amman.addr.addLabel(`candy-machine-holds-${number}`, candyMachineSigner.publicKey);
        yield helpers_1.amman.addr.addLabel(`tx: create-cm holding ${number} assets`, transactionId);
        return {
            candyMachine,
            payerSigner,
            candyMachineSigner,
        };
    });
}
exports.createCandyMachineWithMaxSupply = createCandyMachineWithMaxSupply;
//# sourceMappingURL=create.js.map