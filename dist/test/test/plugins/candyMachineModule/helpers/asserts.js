"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCreators = void 0;
const spok_1 = __importDefault(require("spok"));
function assertCreators(t, creators, config) {
    t.equal(creators.length, config.length, 'creators.length');
    creators = Array.from(creators);
    creators.sort((a, b) => a.address.toBase58().localeCompare(b.address.toBase58()));
    config = Array.from(config);
    config.sort((a, b) => a.address.localeCompare(b.address));
    for (let i = 0; i < creators.length; i++) {
        const creator = creators[i];
        const conf = config[i];
        (0, spok_1.default)(t, creator, {
            verified: conf.verified,
            share: conf.share,
        });
        t.equal(creator.address.toBase58(), conf.address);
    }
}
exports.assertCreators = assertCreators;
//# sourceMappingURL=asserts.js.map