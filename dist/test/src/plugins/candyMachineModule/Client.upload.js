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
exports.uploadAssetsForCandyMachine = exports.uploadAssetForCandyMachine = void 0;
const errors_1 = require("../../errors");
const Client_helpers_1 = require("./Client.helpers");
const utils_1 = require("../../utils");
function uploadAssetForCandyMachine(params) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const { candyMachineAddress, authoritySigner, metadata: rawMetadata, addToCandyMachine = false, confirmOptions, } = params;
        const candyMachine = yield this.findByAddress(candyMachineAddress);
        if (candyMachine == null) {
            throw new errors_1.CandyMachineToUpdateNotFoundError(candyMachineAddress);
        }
        (0, Client_helpers_1.assertNotFull)(candyMachine, candyMachine.assetsCount);
        const { uri, metadata } = yield this.metaplex.nfts().uploadMetadata(Object.assign(Object.assign({}, rawMetadata), { 
            // TODO(thlorenz): Is this correct?
            seller_fee_basis_points: (_a = rawMetadata.seller_fee_basis_points) !== null && _a !== void 0 ? _a : candyMachine.sellerFeeBasisPoints, properties: Object.assign(Object.assign({}, rawMetadata.properties), { 
                // Default NFT creators to equal those of the Candy Machine
                creators: (_c = (_b = rawMetadata.properties) === null || _b === void 0 ? void 0 : _b.creators) !== null && _c !== void 0 ? _c : (0, Client_helpers_1.creatorsToJsonMetadataCreators)(candyMachine.creators) }) }));
        let addAssetsTransactionId;
        if (addToCandyMachine) {
            const { transactionId } = yield this.addAssets({
                candyMachineAddress: candyMachineAddress,
                authoritySigner: authoritySigner,
                assets: [{ uri, name: (_d = metadata.name) !== null && _d !== void 0 ? _d : (0, utils_1.randomStr)() }],
                confirmOptions,
            });
            addAssetsTransactionId = transactionId;
        }
        return {
            metadata,
            uri,
            addAssetsTransactionId,
        };
    });
}
exports.uploadAssetForCandyMachine = uploadAssetForCandyMachine;
function uploadAssetsForCandyMachine(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { candyMachineAddress, assets, parallel = false, addToCandyMachine = false, } = params;
        const candyMachine = yield this.findByAddress(candyMachineAddress);
        if (candyMachine == null) {
            throw new errors_1.CandyMachineToUpdateNotFoundError(candyMachineAddress);
        }
        (0, Client_helpers_1.assertNotFull)(candyMachine, candyMachine.assetsCount);
        (0, Client_helpers_1.assertCanAdd)(candyMachine, candyMachine.assetsCount, assets.length);
        // TODO(thlorenz): prevent same asset from being uploaded twice, remove once
        // API improves to have clearly separated properties
        const uploadParams = assets.map((file) => (Object.assign(Object.assign({}, params), { metadata: {
                image: file,
                name: file.displayName,
            }, 
            // We add them all in one transaction after all assets are uploaded
            addToCandyMachine: false })));
        let uploadedAssets = [];
        const errors = [];
        if (parallel) {
            // NOTE: we are uploading in parallel here but if only one upload was to fail
            // all the other ones still happen as we cannot cancel promises
            const promises = uploadParams.map((assetParam) => __awaiter(this, void 0, void 0, function* () {
                let uploaded;
                let err;
                try {
                    uploaded = yield _uploadAssetAndSelectName(this, assetParam);
                }
                catch (e) {
                    errors.push(e);
                }
                return { uploaded, err };
            }));
            const results = yield Promise.all(promises);
            for (const { err, uploaded } of results) {
                if (err) {
                    errors.push(err);
                }
                else {
                    uploadedAssets.push(uploaded);
                }
            }
        }
        else {
            for (const assetParam of uploadParams) {
                try {
                    uploadedAssets.push(yield _uploadAssetAndSelectName(this, assetParam));
                }
                catch (err) {
                    errors.push(err);
                    continue;
                }
            }
        }
        let addAssetsTransactionId;
        let updatedCandyMachine = candyMachine;
        if (addToCandyMachine && uploadedAssets.length > 0) {
            const configLines = uploadedAssets.map((x) => ({
                uri: x.uri,
                name: x.name,
            }));
            const { transactionId, candyMachine } = yield this.addAssets(Object.assign(Object.assign({}, params), { assets: configLines }));
            addAssetsTransactionId = transactionId;
            if (candyMachine != null) {
                updatedCandyMachine = candyMachine;
            }
        }
        return {
            addAssetsTransactionId,
            uploadedAssets,
            candyMachine: updatedCandyMachine,
            errors,
        };
    });
}
exports.uploadAssetsForCandyMachine = uploadAssetsForCandyMachine;
function _uploadAssetAndSelectName(candyMachine, params) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { uri, metadata: parseMetadata } = yield candyMachine.uploadAssetForCandyMachine(params);
        return {
            uri,
            metadata: parseMetadata,
            name: (_a = parseMetadata.name) !== null && _a !== void 0 ? _a : (0, utils_1.randomStr)(),
        };
    });
}
//# sourceMappingURL=Client.upload.js.map