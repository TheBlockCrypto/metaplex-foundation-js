"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandyMachineClient = void 0;
const Client_queries_1 = require("./Client.queries");
const Client_create_1 = require("./Client.create");
const Client_update_1 = require("./Client.update");
const Client_upload_1 = require("./Client.upload");
const Client_add_1 = require("./Client.add");
class CandyMachineClient {
    constructor(metaplex) {
        this.metaplex = metaplex;
        // -----------------
        // Queries
        // -----------------
        this.findByAddress = Client_queries_1.findByAddress;
        this.findAllByWallet = Client_queries_1.findAllByWallet;
        this.findAllByAuthority = Client_queries_1.findAllByAuthority;
        this.findByAuthorityAndUuid = Client_queries_1.findByAuthorityAndUuid;
        // -----------------
        // Create
        // -----------------
        this.create = Client_create_1.create;
        this.createFromConfig = Client_create_1.createFromConfig;
        // -----------------
        // Update
        // -----------------
        this.update = Client_update_1.update;
        this.updateAuthority = Client_update_1.updateAuthority;
        // -----------------
        // Add Assets
        // -----------------
        this.addAssets = Client_add_1.addAssets;
        // -----------------
        // Upload Assets
        // -----------------
        this.uploadAssetForCandyMachine = Client_upload_1.uploadAssetForCandyMachine;
        this.uploadAssetsForCandyMachine = Client_upload_1.uploadAssetsForCandyMachine;
    }
}
exports.CandyMachineClient = CandyMachineClient;
//# sourceMappingURL=CandyMachineClient.js.map