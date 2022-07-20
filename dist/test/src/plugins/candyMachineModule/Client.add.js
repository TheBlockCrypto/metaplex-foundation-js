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
exports.addAssets = void 0;
const errors_1 = require("../../errors");
const addConfigLines_1 = require("./addConfigLines");
const Client_helpers_1 = require("./Client.helpers");
function addAssets(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentCandyMachine = yield this.findByAddress(params.candyMachineAddress);
        if (currentCandyMachine == null) {
            throw new errors_1.CandyMachineToUpdateNotFoundError(params.candyMachineAddress);
        }
        const index = currentCandyMachine.assetsCount;
        (0, Client_helpers_1.assertNotFull)(currentCandyMachine, index);
        (0, Client_helpers_1.assertCanAdd)(currentCandyMachine, index, params.assets.length);
        (0, Client_helpers_1.assertAllConfigLineConstraints)(params.assets);
        const addConfigLinesInput = {
            candyMachineAddress: params.candyMachineAddress,
            authoritySigner: params.authoritySigner,
            index,
            configLines: params.assets,
        };
        const addConfigLinesOutput = yield this.metaplex
            .operations()
            .execute((0, addConfigLines_1.addConfigLinesOperation)(addConfigLinesInput));
        const candyMachine = yield this.findByAddress(params.candyMachineAddress);
        if (currentCandyMachine == null) {
            throw new errors_1.UpdatedCandyMachineNotFoundError(params.candyMachineAddress);
        }
        return Object.assign({ candyMachine }, addConfigLinesOutput);
    });
}
exports.addAssets = addAssets;
//# sourceMappingURL=Client.add.js.map