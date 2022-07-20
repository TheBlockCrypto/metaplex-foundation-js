"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const programs_1 = require("../../programs");
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const useJsonMetadataTask_1 = require("./useJsonMetadataTask");
const useEditionTask_1 = require("./useEditionTask");
class Nft extends types_1.Model {
    constructor(metadataAccount, metaplex) {
        super();
        this.metadataAccount = metadataAccount;
        this.metadataTask = (0, useJsonMetadataTask_1.useJsonMetadataTask)(metaplex, this);
        this.editionTask = (0, useEditionTask_1.useEditionTask)(metaplex, this);
        this.updateAuthority = metadataAccount.data.updateAuthority;
        this.mint = metadataAccount.data.mint;
        this.name = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.name);
        this.symbol = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.symbol);
        this.uri = (0, utils_1.removeEmptyChars)(metadataAccount.data.data.uri);
        this.sellerFeeBasisPoints = metadataAccount.data.data.sellerFeeBasisPoints;
        this.creators = metadataAccount.data.data.creators;
        this.primarySaleHappened = metadataAccount.data.primarySaleHappened;
        this.isMutable = metadataAccount.data.isMutable;
        this.editionNonce = metadataAccount.data.editionNonce;
        this.tokenStandard = metadataAccount.data.tokenStandard;
        this.collection = metadataAccount.data.collection;
        this.uses = metadataAccount.data.uses;
    }
    get metadata() {
        var _a;
        return (_a = this.metadataTask.getResult()) !== null && _a !== void 0 ? _a : {};
    }
    get editionAccount() {
        var _a;
        return (_a = this.editionTask.getResult()) !== null && _a !== void 0 ? _a : null;
    }
    get originalEdition() {
        if (!this.isOriginal()) {
            return null;
        }
        return this.editionAccount.data;
    }
    get printEdition() {
        if (!this.isPrint()) {
            return null;
        }
        return this.editionAccount.data;
    }
    equals(other) {
        const mint = other instanceof Nft ? other.mint : other;
        return this.mint.equals(mint);
    }
    isOriginal() {
        return (this.editionAccount != null &&
            (0, programs_1.isOriginalEditionAccount)(this.editionAccount));
    }
    isPrint() {
        return (this.editionAccount != null && (0, programs_1.isPrintEditionAccount)(this.editionAccount));
    }
}
exports.Nft = Nft;
//# sourceMappingURL=Nft.js.map