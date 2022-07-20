"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPublickKey = exports.isPublicKeyString = exports.isValidPublicKeyAddress = exports.isValidSolanaAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../utils");
/**
 * Checks if a string is valid base58 Solana via a Regex.
 * @private
 */
function isValidSolanaAddress(address) {
    return /^[0-9a-zA-Z]{43,88}$/.test(address);
}
exports.isValidSolanaAddress = isValidSolanaAddress;
/**
 * Checks if a string is valid PublicKey address.
 * @private
 */
function isValidPublicKeyAddress(address) {
    if (!isValidSolanaAddress(address) || address.length > 44)
        return false;
    try {
        new web3_js_1.PublicKey(address);
        return true;
    }
    catch (_) {
        return false;
    }
}
exports.isValidPublicKeyAddress = isValidPublicKeyAddress;
/**
 * Checks if the {@link value} is valid base58 string for a PublicKey of a Solana Account.
 * @private
 */
function isPublicKeyString(value) {
    return typeof value === 'string' && isValidPublicKeyAddress(value);
}
exports.isPublicKeyString = isPublicKeyString;
/**
 * Tries to convert the {@link value} to a PublicKey.
 *
 * @throws {@link AssertionError} if the {@link value} is not a valid base58 string for a PublicKey of a Solana
 * Account.
 * @private
 * @throws if value is not a valid PublicKey address
 */
function convertToPublickKey(value) {
    (0, utils_1.assert)(isPublicKeyString(value), `${value} is not a valid PublicKey`);
    return new web3_js_1.PublicKey(value);
}
exports.convertToPublickKey = convertToPublickKey;
//# sourceMappingURL=PublicKeyString.js.map