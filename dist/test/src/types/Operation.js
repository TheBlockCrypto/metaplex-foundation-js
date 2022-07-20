"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOperation = void 0;
const useOperation = (key) => {
    const constructor = (input) => {
        return {
            key,
            input,
        };
    };
    constructor.key = key;
    return constructor;
};
exports.useOperation = useOperation;
//# sourceMappingURL=Operation.js.map