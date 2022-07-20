"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandyMachineStorages = exports.AWS = exports.NFT_STORAGE = exports.IPFS = exports.ARWEAVE_BUNDLE = exports.ARWEAVE_SOL = void 0;
/**
 * Uploads to arweave using Bundlr and payments are made in SOL (Recommended
 * option. Works on mainnet and devnet. Files are only stored for 7 days on
 * devnet.)
 */
exports.ARWEAVE_SOL = 'arweave-sol';
/**
 * Uploads to arweave and payments are made in AR (only works in mainnet and
 * requires an Arweave wallet)
 */
exports.ARWEAVE_BUNDLE = 'arweave-bundle';
/** Uploads to IPFS (must specify either Infura Project ID or Secret Key) */
exports.IPFS = 'ipfs';
/** Uploads to NFT.Storage (no payment required, works on all networks) */
exports.NFT_STORAGE = 'nft-storage';
/** Uploads to AWS (must specify AWS Bucket name) */
exports.AWS = 'aws';
/** Arweave specific storages */
const ArweaveStorages = [exports.ARWEAVE_SOL, exports.ARWEAVE_BUNDLE];
/** The existing storage options */
exports.CandyMachineStorages = [
    ...ArweaveStorages,
    exports.IPFS,
    exports.NFT_STORAGE,
    exports.AWS,
];
//# sourceMappingURL=Storage.js.map