"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatekeeperFromConfig = void 0;
const types_1 = require("../../../types");
function gatekeeperFromConfig(config) {
    if (config == null)
        return undefined;
    return Object.assign(Object.assign({}, config), { gatekeeperNetwork: (0, types_1.convertToPublickKey)(config.gatekeeperNetwork) });
}
exports.gatekeeperFromConfig = gatekeeperFromConfig;
//# sourceMappingURL=Gatekeeper.js.map