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
exports.updateAuthority = exports.update = void 0;
const errors_1 = require("../../errors");
const updateCandyMachine_1 = require("./updateCandyMachine");
const updateAuthority_1 = require("./updateAuthority");
function update(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentCandyMachine = yield this.findByAddress(input.candyMachineAddress);
        if (currentCandyMachine == null) {
            throw new errors_1.CandyMachineToUpdateNotFoundError(input.candyMachineAddress);
        }
        const updatedData = currentCandyMachine.updatedCandyMachineData(input);
        const operation = (0, updateCandyMachine_1.updateCandyMachineOperation)(Object.assign(Object.assign({}, input), updatedData));
        const output = yield this.metaplex.operations().execute(operation);
        const candyMachine = yield this.findByAddress(input.candyMachineAddress);
        if (candyMachine == null) {
            throw new errors_1.UpdatedCandyMachineNotFoundError(input.candyMachineAddress);
        }
        return Object.assign({ candyMachine }, output);
    });
}
exports.update = update;
function updateAuthority(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentCandyMachine = yield this.findByAddress(input.candyMachineAddress);
        if (currentCandyMachine == null) {
            throw new errors_1.CandyMachineToUpdateNotFoundError(input.candyMachineAddress);
        }
        if (currentCandyMachine.authorityAddress.equals(input.newAuthorityAddress)) {
            throw new errors_1.CandyMachineAlreadyHasThisAuthorityError(input.newAuthorityAddress);
        }
        const operation = (0, updateAuthority_1.updateAuthorityOperation)(input);
        const output = yield this.metaplex.operations().execute(operation);
        const candyMachine = yield this.findByAddress(input.candyMachineAddress);
        if (candyMachine == null) {
            throw new errors_1.UpdatedCandyMachineNotFoundError(input.candyMachineAddress);
        }
        return Object.assign({ candyMachine }, output);
    });
}
exports.updateAuthority = updateAuthority;
//# sourceMappingURL=Client.update.js.map