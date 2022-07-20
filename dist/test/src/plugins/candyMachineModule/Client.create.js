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
exports.createFromConfig = exports.create = void 0;
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("../../types");
const errors_1 = require("../../errors");
const config_1 = require("./config");
const createCandyMachine_1 = require("./createCandyMachine");
function create(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const operation = (0, createCandyMachine_1.createCandyMachineOperation)(input);
        const output = yield this.metaplex.operations().execute(operation);
        const candyMachine = yield this.findByAddress(output.candyMachineSigner.publicKey);
        if (candyMachine === null) {
            throw new errors_1.CreatedCandyMachineNotFoundError(output.candyMachineSigner.publicKey);
        }
        return Object.assign({ candyMachine }, output);
    });
}
exports.create = create;
function createFromConfig(config, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { candyMachineSigner = web3_js_1.Keypair.generate() } = opts;
        const candyMachineData = (0, config_1.candyMachineDataFromConfig)(config, candyMachineSigner.publicKey);
        const walletAddress = (0, types_1.convertToPublickKey)(config.solTreasuryAccount);
        return this.create(Object.assign({ candyMachineSigner,
            walletAddress, authorityAddress: opts.authorityAddress }, candyMachineData));
    });
}
exports.createFromConfig = createFromConfig;
//# sourceMappingURL=Client.create.js.map