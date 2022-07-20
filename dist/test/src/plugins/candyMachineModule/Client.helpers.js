"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertAllConfigLineConstraints = exports.assertCanAdd = exports.assertNotFull = exports.creatorsToJsonMetadataCreators = void 0;
const errors_1 = require("../../errors");
const candyMachineInternals_1 = require("../../programs/candyMachine/accounts/candyMachineInternals");
function creatorsToJsonMetadataCreators(creators) {
    return creators.map((creator) => ({
        address: creator.address.toBase58(),
        share: creator.share,
        verified: creator.verified,
    }));
}
exports.creatorsToJsonMetadataCreators = creatorsToJsonMetadataCreators;
function assertNotFull(candyMachine, index) {
    if (candyMachine.isFull) {
        throw new errors_1.CandyMachineIsFullError(index, candyMachine.maxSupply);
    }
}
exports.assertNotFull = assertNotFull;
function assertCanAdd(candyMachine, index, amount) {
    if (index + amount > candyMachine.maxSupply) {
        throw new errors_1.CandyMachineCannotAddAmountError(index, amount, candyMachine.maxSupply);
    }
}
exports.assertCanAdd = assertCanAdd;
function assertAllConfigLineConstraints(configLines) {
    for (let i = 0; i < configLines.length; i++) {
        try {
            (0, candyMachineInternals_1.assertConfigLineConstraints)(configLines[i]);
        }
        catch (err) {
            throw new errors_1.CandyMachineAddConfigConstraintsViolatedError(i, configLines[i], err);
        }
    }
}
exports.assertAllConfigLineConstraints = assertAllConfigLineConstraints;
//# sourceMappingURL=Client.helpers.js.map