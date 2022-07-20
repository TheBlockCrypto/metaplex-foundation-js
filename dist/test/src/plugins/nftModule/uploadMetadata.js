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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAssetsWithUris = exports.getAssetsFromJsonMetadata = exports.uploadMetadataOperationHandler = exports.uploadMetadataOperation = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const storageModule_1 = require("../storageModule");
const Key = 'UploadMetadataOperation';
exports.uploadMetadataOperation = (0, types_1.useOperation)(Key);
exports.uploadMetadataOperationHandler = {
    handle: (operation, metaplex) => __awaiter(void 0, void 0, void 0, function* () {
        const rawMetadata = operation.input;
        const files = (0, exports.getAssetsFromJsonMetadata)(rawMetadata);
        const assetUris = yield metaplex.storage().uploadAll(files);
        const metadata = (0, exports.replaceAssetsWithUris)(rawMetadata, assetUris);
        const uri = yield metaplex.storage().uploadJson(metadata);
        return { uri, metadata, assetUris };
    }),
};
const getAssetsFromJsonMetadata = (input) => {
    const files = [];
    (0, utils_1.walk)(input, (next, value) => {
        if ((0, storageModule_1.isMetaplexFile)(value)) {
            files.push(value);
        }
        else {
            next(value);
        }
    });
    return files;
};
exports.getAssetsFromJsonMetadata = getAssetsFromJsonMetadata;
const replaceAssetsWithUris = (input, replacements) => {
    const clone = (0, lodash_clonedeep_1.default)(input);
    let index = 0;
    (0, utils_1.walk)(clone, (next, value, key, parent) => {
        if ((0, storageModule_1.isMetaplexFile)(value) && index < replacements.length) {
            parent[key] = replacements[index++];
        }
        next(value);
    });
    return clone;
};
exports.replaceAssetsWithUris = replaceAssetsWithUris;
//# sourceMappingURL=uploadMetadata.js.map