"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountParsingFunction = exports.parseAccount = void 0;
const errors_1 = require("../errors");
function parseAccount(account, parser) {
    if ('exists' in account && !account.exists) {
        return account;
    }
    return getAccountParsingFunction(parser)(account);
}
exports.parseAccount = parseAccount;
function getAccountParsingFunction(parser) {
    function parse(account) {
        if ('exists' in account && !account.exists) {
            return account;
        }
        try {
            const data = parser.deserialize(account.data)[0];
            return Object.assign(Object.assign({}, account), { data });
        }
        catch (error) {
            throw new errors_1.UnexpectedAccountError(account.publicKey, parser.name, error);
        }
    }
    return parse;
}
exports.getAccountParsingFunction = getAccountParsingFunction;
//# sourceMappingURL=Account.js.map