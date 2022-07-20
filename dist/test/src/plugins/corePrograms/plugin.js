"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corePrograms = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const mpl_auction_house_1 = require("@metaplex-foundation/mpl-auction-house");
const programs_1 = require("../../programs");
const corePrograms = () => ({
    install(metaplex) {
        // System Program.
        metaplex.programs().register({
            name: 'SystemProgram',
            address: web3_js_1.SystemProgram.programId,
        });
        // Token Program.
        metaplex.programs().register({
            name: 'TokenProgram',
            address: spl_token_1.TOKEN_PROGRAM_ID,
        });
        // Token Metadata Program.
        metaplex.programs().register({
            name: 'TokenMetadataProgram',
            address: programs_1.TokenMetadataProgram.publicKey,
            errorResolver: (error) => mpl_token_metadata_1.cusper.errorFromProgramLogs(error.logs, false),
            gpaResolver: (metaplex) => new programs_1.TokenMetadataGpaBuilder(metaplex, programs_1.TokenMetadataProgram.publicKey),
        });
        // Auction House Program.
        metaplex.programs().register({
            name: 'AuctionHouseProgram',
            address: programs_1.AuctionHouseProgram.publicKey,
            errorResolver: (error) => mpl_auction_house_1.cusper.errorFromProgramLogs(error.logs, false),
        });
    },
});
exports.corePrograms = corePrograms;
//# sourceMappingURL=plugin.js.map