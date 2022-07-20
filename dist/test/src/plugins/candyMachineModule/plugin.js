"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candyMachineModule = void 0;
const CandyMachineClient_1 = require("./CandyMachineClient");
const addConfigLines_1 = require("./addConfigLines");
const createCandyMachine_1 = require("./createCandyMachine");
const findCandyMachineByAddress_1 = require("./findCandyMachineByAddress");
const findCandyMachinesByPublicKeyField_1 = require("./findCandyMachinesByPublicKeyField");
const updateAuthority_1 = require("./updateAuthority");
const updateCandyMachine_1 = require("./updateCandyMachine");
const candyMachineModule = () => ({
    install(metaplex) {
        const op = metaplex.operations();
        op.register(createCandyMachine_1.createCandyMachineOperation, createCandyMachine_1.createCandyMachineOperationHandler);
        op.register(findCandyMachineByAddress_1.findCandyMachineByAdddressOperation, findCandyMachineByAddress_1.findCandyMachineByAdddressOperationHandler);
        op.register(findCandyMachinesByPublicKeyField_1.findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyField_1.findCandyMachinesByPublicKeyFieldOnChainOperationHandler);
        op.register(updateCandyMachine_1.updateCandyMachineOperation, updateCandyMachine_1.updateCandyMachineOperationHandler);
        op.register(updateAuthority_1.updateAuthorityOperation, updateAuthority_1.updateAuthorityOperationHandler);
        op.register(addConfigLines_1.addConfigLinesOperation, addConfigLines_1.addConfigLinesOperationHandler);
        metaplex.candyMachines = function () {
            return new CandyMachineClient_1.CandyMachineClient(this);
        };
    },
});
exports.candyMachineModule = candyMachineModule;
//# sourceMappingURL=plugin.js.map