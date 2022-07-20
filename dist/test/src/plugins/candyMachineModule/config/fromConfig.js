"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candyMachineAccountDataFromConfig = exports.candyMachineDataFromConfig = void 0;
const mpl_candy_machine_1 = require("@metaplex-foundation/mpl-candy-machine");
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("../../../types");
const Creators_1 = require("./Creators");
const EndSettings_1 = require("./EndSettings");
const Gatekeeper_1 = require("./Gatekeeper");
const HiddenSettings_1 = require("./HiddenSettings");
const WhitelistMint_1 = require("./WhitelistMint");
function candyMachineDataFromConfig(config, candyMachineAddress) {
    var _a, _b, _c, _d, _e, _f;
    const configCreators = (_a = config.creators) !== null && _a !== void 0 ? _a : (0, Creators_1.creatorsConfigDefault)(config.solTreasuryAccount);
    const creators = configCreators.map((creatorConfig) => (Object.assign(Object.assign({}, creatorConfig), { address: (0, types_1.convertToPublickKey)(creatorConfig.address) })));
    const goLiveDate = (0, types_1.convertToMillisecondsSinceEpoch)(config.goLiveDate);
    const hiddenSettings = (_b = (0, HiddenSettings_1.hiddenSettingsFromConfig)(config.hiddenSettings)) !== null && _b !== void 0 ? _b : null;
    const endSettings = (_c = (0, EndSettings_1.endSettingsFromConfig)(config.endSettings)) !== null && _c !== void 0 ? _c : null;
    const whitelistMintSettings = (_d = (0, WhitelistMint_1.whiteListMintSettingsFromConfig)(config.whitelistMintSettings)) !== null && _d !== void 0 ? _d : null;
    const gatekeeper = (_e = (0, Gatekeeper_1.gatekeeperFromConfig)(config.gatekeeper)) !== null && _e !== void 0 ? _e : null;
    return {
        uuid: candyMachineUuidFromAddress(candyMachineAddress),
        price: new bn_js_1.default(config.price),
        symbol: (_f = config.symbol) !== null && _f !== void 0 ? _f : '',
        sellerFeeBasisPoints: config.sellerFeeBasisPoints,
        maxSupply: new bn_js_1.default(config.number),
        isMutable: config.isMutable,
        retainAuthority: config.retainAuthority,
        goLiveDate,
        itemsAvailable: new bn_js_1.default(config.number),
        endSettings,
        hiddenSettings,
        whitelistMintSettings,
        gatekeeper,
        creators,
    };
}
exports.candyMachineDataFromConfig = candyMachineDataFromConfig;
function candyMachineAccountDataFromConfig(config, addresses) {
    var _a;
    const data = candyMachineDataFromConfig(config, addresses.candyMachineAddress);
    const args = {
        authority: addresses.authorityAddress,
        wallet: addresses.walletAddress,
        tokenMint: (_a = addresses.tokenMintAddress) !== null && _a !== void 0 ? _a : null,
        itemsRedeemed: new bn_js_1.default(0),
        data,
    };
    return mpl_candy_machine_1.CandyMachine.fromArgs(args);
}
exports.candyMachineAccountDataFromConfig = candyMachineAccountDataFromConfig;
function candyMachineUuidFromAddress(candyMachineAddress) {
    // NOTE: repeating program business logic here which isn't ideal
    return candyMachineAddress.toBase58().slice(0, 6);
}
//# sourceMappingURL=fromConfig.js.map