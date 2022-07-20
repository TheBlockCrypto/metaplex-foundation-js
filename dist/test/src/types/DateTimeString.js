"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToMillisecondsSinceEpoch = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Tries to convert the {@link dateTimeString} to a big number representing time since epoch in
 * milliseconds. {@see https://www.epoch101.com/}
 *
 * @throws {@link Error} if the {@link dateTimeString} is not a valid date/time string.
 * @private
 */
function convertToMillisecondsSinceEpoch(dateTimeString) {
    const date = new Date(dateTimeString);
    const msSinceEpoch = date.valueOf();
    return new bn_js_1.default(msSinceEpoch);
}
exports.convertToMillisecondsSinceEpoch = convertToMillisecondsSinceEpoch;
//# sourceMappingURL=DateTimeString.js.map