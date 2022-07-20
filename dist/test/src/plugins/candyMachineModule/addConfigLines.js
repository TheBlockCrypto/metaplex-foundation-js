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
exports.addConfigLinesOperationHandler = exports.addConfigLinesOperation = void 0;
const types_1 = require("../../types");
const programs_1 = require("../../programs");
const utils_1 = require("../../utils");
// -----------------
// Operation
// -----------------
const Key = 'AddConfigLinesOperation';
exports.addConfigLinesOperation = (0, types_1.useOperation)(Key);
// -----------------
// Handler
// -----------------
exports.addConfigLinesOperationHandler = {
    handle(operation, metaplex) {
        return __awaiter(this, void 0, void 0, function* () {
            const { candyMachineAddress, authoritySigner, index, configLines, confirmOptions, } = operation.input;
            const { signature, confirmResponse } = yield metaplex
                .rpc()
                .sendAndConfirmTransaction(utils_1.TransactionBuilder.make().add((0, programs_1.createAddConfigLinesInstructionWithSigners)({
                candyMachine: candyMachineAddress,
                authority: authoritySigner,
                index,
                configLines,
            })), undefined, confirmOptions);
            return {
                transactionId: signature,
                confirmResponse,
            };
        });
    },
};
//# sourceMappingURL=addConfigLines.js.map