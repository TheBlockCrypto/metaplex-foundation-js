"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endSettingsFromConfig = exports.EndSettingModes = exports.ENDSETTING_AMOUNT = exports.ENDSETTING_DATE = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("../../../types");
exports.ENDSETTING_DATE = 'date';
exports.ENDSETTING_AMOUNT = 'amount';
exports.EndSettingModes = [exports.ENDSETTING_DATE, exports.ENDSETTING_AMOUNT];
function endSettingsFromConfig(config) {
    if (config == null)
        return undefined;
    const endSettingType = config.endSettingType === exports.ENDSETTING_DATE
        ? mpl_candy_machine_1.EndSettingType.Date
        : mpl_candy_machine_1.EndSettingType.Amount;
    const value = config.endSettingType === exports.ENDSETTING_DATE
        ? (0, types_1.convertToMillisecondsSinceEpoch)(config.value)
        : new bn_js_1.default(config.value);
    return {
        endSettingType,
        number: value,
    };
}
exports.endSettingsFromConfig = endSettingsFromConfig;
//# sourceMappingURL=EndSettings.js.map