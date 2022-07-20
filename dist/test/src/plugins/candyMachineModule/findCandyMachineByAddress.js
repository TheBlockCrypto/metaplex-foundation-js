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
exports.findCandyMachineByAdddressOperationHandler = exports.findCandyMachineByAdddressOperation = void 0;
const types_1 = require("../../types");
const CandyMachine_1 = require("./CandyMachine");
const programs_1 = require("../../programs");
// -----------------
// Operation
// -----------------
const Key = 'FindCandyMachineByAdddressOperation';
exports.findCandyMachineByAdddressOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.findCandyMachineByAdddressOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const candyMachineAddress = operation.input;
        const unparsedAccount = yield metaplex
            .rpc()
            .getAccount(candyMachineAddress);
        const account = (0, programs_1.parseCandyMachineAccount)(unparsedAccount);
        return unparsedAccount.exists && account.exists
            ? CandyMachine_1.CandyMachine.fromAccount(account, unparsedAccount.data)
            : null;
    }),
};
//# sourceMappingURL=findCandyMachineByAddress.js.map