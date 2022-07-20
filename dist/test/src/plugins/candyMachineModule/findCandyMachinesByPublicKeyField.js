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
exports.findCandyMachinesByPublicKeyFieldOnChainOperationHandler = exports.findCandyMachinesByPublicKeyFieldOperation = void 0;
const types_1 = require("../../types");
const CandyMachine_1 = require("./CandyMachine");
const programs_1 = require("../../programs");
const errors_1 = require("../../errors");
// -----------------
// Operation
// -----------------
const Key = 'FindCandyMachinesByPublicKeyOperation';
exports.findCandyMachinesByPublicKeyFieldOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.findCandyMachinesByPublicKeyFieldOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { type, publicKey } = operation.input;
        const accounts = programs_1.CandyMachineProgram.accounts(metaplex);
        let candyMachineQuery;
        switch (type) {
            case 'authority':
                candyMachineQuery =
                    accounts.candyMachineAccountsForAuthority(publicKey);
                break;
            case 'wallet':
                candyMachineQuery = accounts.candyMachineAccountsForWallet(publicKey);
                break;
            default:
                throw new errors_1.UnreachableCaseError(type);
        }
        const candyMachineUnparseds = yield candyMachineQuery.get();
        return candyMachineUnparseds.map((unparsedAccount) => {
            const account = (0, programs_1.parseCandyMachineAccount)(unparsedAccount);
            return CandyMachine_1.CandyMachine.fromAccount(account, unparsedAccount.data);
        });
    }),
};
//# sourceMappingURL=findCandyMachinesByPublicKeyField.js.map