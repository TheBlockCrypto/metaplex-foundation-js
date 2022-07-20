"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteListMintSettingsFromConfig = exports.WhitelistModes = exports.NEVER_BURN = exports.BURN_EVERY_TIME = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("../../../types");
const errors_1 = require("../../../errors");
exports.BURN_EVERY_TIME = 'burnEveryTime';
exports.NEVER_BURN = 'neverBurn';
exports.WhitelistModes = [exports.BURN_EVERY_TIME, exports.NEVER_BURN];
function whiteListMintSettingsFromConfig(config) {
    if (config == null)
        return undefined;
    let mode;
    switch (config.mode) {
        case exports.BURN_EVERY_TIME:
            mode = mpl_candy_machine_1.WhitelistMintMode.BurnEveryTime;
            break;
        case exports.NEVER_BURN:
            mode = mpl_candy_machine_1.WhitelistMintMode.NeverBurn;
            break;
        default:
            throw new errors_1.UnreachableCaseError(config.mode);
    }
    const mint = (0, types_1.convertToPublickKey)(config.mint);
    const discountPrice = new bn_js_1.default(config.discountPrice);
    return Object.assign(Object.assign({}, config), { mode, mint, discountPrice });
}
exports.whiteListMintSettingsFromConfig = whiteListMintSettingsFromConfig;
//# sourceMappingURL=WhitelistMint.js.map