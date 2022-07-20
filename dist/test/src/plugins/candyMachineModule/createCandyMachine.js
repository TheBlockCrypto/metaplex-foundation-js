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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandyMachineBuilder = exports.createCandyMachineOperationHandler = exports.createCandyMachineOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const programs_1 = require("../../programs");
const candyMachineInternals_1 = require("../../programs/candyMachine/accounts/candyMachineInternals");
const Key = 'CreateCandyMachineOperation';
exports.createCandyMachineOperation = (0, types_1.useOperation)(Key);
exports.createCandyMachineOperationHandler = {
    handle(operation, metaplex) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = operation.input, { candyMachineSigner = web3_js_1.Keypair.generate(), payerSigner = metaplex.identity(), walletAddress = payerSigner.publicKey, authorityAddress = payerSigner.publicKey, confirmOptions } = _a, candyMachineData = __rest(_a, ["candyMachineSigner", "payerSigner", "walletAddress", "authorityAddress", "confirmOptions"]);
            const { signature, confirmResponse } = yield metaplex
                .rpc()
                .sendAndConfirmTransaction(yield (0, exports.createCandyMachineBuilder)(Object.assign({ metaplex,
                payerSigner,
                candyMachineSigner,
                walletAddress,
                authorityAddress,
                confirmOptions }, candyMachineData)), undefined, confirmOptions);
            return {
                // Accounts.
                payerSigner,
                candyMachineSigner,
                walletAddress,
                authorityAddress,
                // Transaction Result.
                transactionId: signature,
                confirmResponse,
            };
        });
    },
};
const createCandyMachineBuilder = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { metaplex, candyMachineSigner, payerSigner, walletAddress, authorityAddress, createAccountInstructionKey, initializeCandyMachineInstructionKey } = params, candyMachineData = __rest(params, ["metaplex", "candyMachineSigner", "payerSigner", "walletAddress", "authorityAddress", "createAccountInstructionKey", "initializeCandyMachineInstructionKey"]);
    const space = (0, candyMachineInternals_1.getSpaceForCandy)(candyMachineData);
    const lamports = yield metaplex.connection.getMinimumBalanceForRentExemption(space);
    return utils_1.TransactionBuilder.make()
        .add((0, programs_1.createAccountBuilder)({
        payer: payerSigner,
        newAccount: candyMachineSigner,
        space,
        lamports,
        program: mpl_candy_machine_1.PROGRAM_ID,
        instructionKey: createAccountInstructionKey,
    }))
        .add((0, programs_1.createInitializeCandyMachineInstructionWithSigners)({
        data: candyMachineData,
        candyMachine: candyMachineSigner,
        payer: payerSigner,
        wallet: walletAddress,
        authority: authorityAddress,
        instructionKey: initializeCandyMachineInstructionKey,
    }));
});
exports.createCandyMachineBuilder = createCandyMachineBuilder;
//# sourceMappingURL=createCandyMachine.js.map