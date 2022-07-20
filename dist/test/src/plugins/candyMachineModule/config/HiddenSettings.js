"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hiddenSettingsFromConfig = void 0;
function hiddenSettingsFromConfig(config) {
    if (config == null)
        return undefined;
    const hash = Buffer.from(config.hash, 'utf8').toJSON().data;
    return Object.assign(Object.assign({}, config), { hash });
}
exports.hiddenSettingsFromConfig = hiddenSettingsFromConfig;
//# sourceMappingURL=HiddenSettings.js.map