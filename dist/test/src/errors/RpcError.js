"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToConfirmTransactionWithResponseError = exports.FailedToConfirmTransactionError = exports.FailedToSendTransactionError = exports.RpcError = void 0;
const MetaplexError_1 = require("./MetaplexError");
class RpcError extends MetaplexError_1.MetaplexError {
    constructor(input) {
        super(Object.assign(Object.assign({}, input), { key: `rpc.${input.key}`, source: 'rpc' }));
    }
}
exports.RpcError = RpcError;
class FailedToSendTransactionError extends RpcError {
    constructor(cause) {
        super({
            cause,
            key: 'failed_to_send_transaction',
            title: 'Failed to Send Transaction',
            problem: `The transaction could not be sent successfully to the network.`,
            solution: 'Check the error below for more information.',
            logs: cause.logs,
        });
    }
    asSendTransactionError() {
        return this.cause;
    }
    get error() {
        return this.asSendTransactionError().message;
    }
    get errorLogs() {
        var _a;
        return (_a = this.asSendTransactionError().logs) !== null && _a !== void 0 ? _a : [];
    }
}
exports.FailedToSendTransactionError = FailedToSendTransactionError;
class FailedToConfirmTransactionError extends RpcError {
    constructor(cause) {
        super({
            cause,
            key: 'failed_to_confirm_transaction',
            title: 'Failed to Confirm Transaction',
            problem: `The transaction could not be confirmed.`,
            solution: 'Check the error below for more information.',
        });
    }
}
exports.FailedToConfirmTransactionError = FailedToConfirmTransactionError;
class FailedToConfirmTransactionWithResponseError extends FailedToConfirmTransactionError {
    constructor(response) {
        const getMessage = (error) => {
            if (!error)
                return 'Unknown error';
            if (typeof error === 'string')
                return error;
            try {
                return JSON.stringify(error);
            }
            catch (error) {
                return 'Unknown error';
            }
        };
        super(new Error(getMessage(response.value.err)));
        this.response = response;
    }
    get error() {
        var _a;
        return (_a = this.response.value.err) !== null && _a !== void 0 ? _a : 'Unknown error';
    }
}
exports.FailedToConfirmTransactionWithResponseError = FailedToConfirmTransactionWithResponseError;
//# sourceMappingURL=RpcError.js.map