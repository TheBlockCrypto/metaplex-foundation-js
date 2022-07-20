"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrintEditionAccount = exports.isOriginalEditionAccount = exports.parsePrintEditionAccount = exports.parseOriginalEditionAccount = exports.parseOriginalOrPrintEditionAccount = void 0;
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const types_1 = require("../../../types");
exports.parseOriginalOrPrintEditionAccount = (0, types_1.getAccountParsingFunction)({
    name: 'MasterEditionV1 | MasterEditionV2 | Edition',
    deserialize: (data, offset = 0) => {
        if ((data === null || data === void 0 ? void 0 : data[0]) === mpl_token_metadata_1.Key.MasterEditionV1) {
            return mpl_token_metadata_1.MasterEditionV1.deserialize(data, offset);
        }
        else if ((data === null || data === void 0 ? void 0 : data[0]) === mpl_token_metadata_1.Key.MasterEditionV2) {
            return mpl_token_metadata_1.MasterEditionV2.deserialize(data, offset);
        }
        else {
            return mpl_token_metadata_1.Edition.deserialize(data, offset);
        }
    },
});
exports.parseOriginalEditionAccount = (0, types_1.getAccountParsingFunction)({
    name: 'MasterEditionV1 | MasterEditionV2',
    deserialize: (data, offset = 0) => {
        if ((data === null || data === void 0 ? void 0 : data[0]) === mpl_token_metadata_1.Key.MasterEditionV1) {
            return mpl_token_metadata_1.MasterEditionV1.deserialize(data, offset);
        }
        else {
            return mpl_token_metadata_1.MasterEditionV2.deserialize(data, offset);
        }
    },
});
exports.parsePrintEditionAccount = (0, types_1.getAccountParsingFunction)(mpl_token_metadata_1.Edition);
const isOriginalEditionAccount = (account) => {
    return 'maxSupply' in account.data;
};
exports.isOriginalEditionAccount = isOriginalEditionAccount;
const isPrintEditionAccount = (account) => {
    return !(0, exports.isOriginalEditionAccount)(account);
};
exports.isPrintEditionAccount = isPrintEditionAccount;
//# sourceMappingURL=EditionAccounts.js.map