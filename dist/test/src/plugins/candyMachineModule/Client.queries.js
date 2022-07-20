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
exports.findByAuthorityAndUuid = exports.findAllByAuthority = exports.findAllByWallet = exports.findByAddress = void 0;
const findCandyMachineByAddress_1 = require("./findCandyMachineByAddress");
const findCandyMachinesByPublicKeyField_1 = require("./findCandyMachinesByPublicKeyField");
const CandyMachineError_1 = require("../../errors/CandyMachineError");
function findByAddress(address) {
    const operation = (0, findCandyMachineByAddress_1.findCandyMachineByAdddressOperation)(address);
    return this.metaplex.operations().execute(operation);
}
exports.findByAddress = findByAddress;
function findAllByWallet(walletAddress) {
    return this.metaplex.operations().execute((0, findCandyMachinesByPublicKeyField_1.findCandyMachinesByPublicKeyFieldOperation)({
        type: 'wallet',
        publicKey: walletAddress,
    }));
}
exports.findAllByWallet = findAllByWallet;
function findAllByAuthority(authorityAddress) {
    return this.metaplex.operations().execute((0, findCandyMachinesByPublicKeyField_1.findCandyMachinesByPublicKeyFieldOperation)({
        type: 'authority',
        publicKey: authorityAddress,
    }));
}
exports.findAllByAuthority = findAllByAuthority;
function findByAuthorityAndUuid(authorityAddress, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const candyMachinesForAuthority = yield this.findAllByAuthority(authorityAddress);
        if (candyMachinesForAuthority.length === 0) {
            throw new CandyMachineError_1.CandyMachinesNotFoundByAuthorityError(authorityAddress);
        }
        const matchingUUid = candyMachinesForAuthority.filter((candyMachine) => candyMachine.uuid === uuid);
        if (matchingUUid.length === 0) {
            const addresses = candyMachinesForAuthority.map((candyMachine) => candyMachine.candyMachineAccount.publicKey);
            throw new CandyMachineError_1.NoCandyMachineFoundForAuthorityMatchesUuidError(authorityAddress, uuid, addresses);
        }
        if (matchingUUid.length > 1) {
            const addresses = matchingUUid.map((candyMachine) => candyMachine.candyMachineAccount.publicKey);
            throw new CandyMachineError_1.MoreThanOneCandyMachineFoundByAuthorityAndUuidError(authorityAddress, uuid, addresses);
        }
        return matchingUUid[0];
    });
}
exports.findByAuthorityAndUuid = findByAuthorityAndUuid;
//# sourceMappingURL=Client.queries.js.map