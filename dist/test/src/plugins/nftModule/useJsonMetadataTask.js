"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonMetadataTask = void 0;
const utils_1 = require("../../utils");
const useJsonMetadataTask = (metaplex, nft) => new utils_1.Task(({ signal }) => {
    return metaplex.storage().downloadJson(nft.uri, { signal });
});
exports.useJsonMetadataTask = useJsonMetadataTask;
//# sourceMappingURL=useJsonMetadataTask.js.map