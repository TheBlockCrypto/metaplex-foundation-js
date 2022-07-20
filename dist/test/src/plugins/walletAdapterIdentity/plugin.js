"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletOrGuestIdentity = exports.walletAdapterIdentity = void 0;
const guestIdentity_1 = require("../guestIdentity");
const WalletAdapterIdentityDriver_1 = require("./WalletAdapterIdentityDriver");
const walletAdapterIdentity = (walletAdapter) => ({
    install(metaplex) {
        metaplex
            .identity()
            .setDriver(new WalletAdapterIdentityDriver_1.WalletAdapterIdentityDriver(walletAdapter));
    },
});
exports.walletAdapterIdentity = walletAdapterIdentity;
const walletOrGuestIdentity = (walletAdapter) => ({
    install(metaplex) {
        const identity = walletAdapter
            ? new WalletAdapterIdentityDriver_1.WalletAdapterIdentityDriver(walletAdapter)
            : new guestIdentity_1.GuestIdentityDriver();
        metaplex.identity().setDriver(identity);
    },
});
exports.walletOrGuestIdentity = walletOrGuestIdentity;
//# sourceMappingURL=plugin.js.map