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
exports.updateCandyMachineOperationHandler = exports.updateCandyMachineOperation = void 0;
const types_1 = require("../../types");
const programs_1 = require("../../programs");
const utils_1 = require("../../utils");
// -----------------
// Operation
// -----------------
const Key = 'UpdateCandyMachineOperation';
exports.updateCandyMachineOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.updateCandyMachineOperationHandler = {
    handle(operation, metaplex) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = operation.input, { candyMachineAddress, walletAddress, authoritySigner, confirmOptions } = _a, candyMachineData = __rest(_a, ["candyMachineAddress", "walletAddress", "authoritySigner", "confirmOptions"]);
            const { signature, confirmResponse } = yield metaplex
                .rpc()
                .sendAndConfirmTransaction(utils_1.TransactionBuilder.make().add((0, programs_1.createUpdateCandyMachineInstructionWithSigners)({
                candyMachine: candyMachineAddress,
                wallet: walletAddress,
                authority: authoritySigner,
                data: candyMachineData,
            })), undefined, confirmOptions);
            return {
                transactionId: signature,
                confirmResponse,
            };
        });
    },
};
//# sourceMappingURL=updateCandyMachine.js.map