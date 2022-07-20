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
exports.findNftsByCandyMachineOnChainOperationHandler = exports.findNftsByCandyMachineOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("../../types");
const findNftsByCreator_1 = require("./findNftsByCreator");
const Key = 'FindNftsByCandyMachineOperation';
exports.findNftsByCandyMachineOperation = (0, types_1.useOperation)(Key);
exports.findNftsByCandyMachineOnChainOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const { candyMachine, version = 2 } = operation.input;
        let firstCreator = candyMachine;
        if (version === 2) {
            // TODO: Refactor when we have a CandyMachine program in the SDK.
            [firstCreator] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from('candy_machine'), candyMachine.toBuffer()], new web3_js_1.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'));
        }
        return metaplex.operations().execute((0, findNftsByCreator_1.findNftsByCreatorOperation)({
            creator: firstCreator,
            position: 1,
        }));
    }),
};
//# sourceMappingURL=findNftsByCandyMachine.js.map