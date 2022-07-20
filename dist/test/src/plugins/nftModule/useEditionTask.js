"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditionTask = void 0;
const programs_1 = require("../../programs");
const utils_1 = require("../../utils");
const useEditionTask = (metaplex, nft) => new utils_1.Task(() => __awaiter(void 0, void 0, void 0, function* () {
    const pda = (0, programs_1.findMasterEditionV2Pda)(nft.mint);
    const edition = (0, programs_1.parseOriginalOrPrintEditionAccount)(yield metaplex.rpc().getAccount(pda));
    return edition.exists ? edition : null;
}));
exports.useEditionTask = useEditionTask;
//# sourceMappingURL=useEditionTask.js.map