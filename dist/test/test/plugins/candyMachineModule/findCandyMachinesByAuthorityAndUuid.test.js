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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const helpers_1 = require("../../helpers");
const spok_1 = __importDefault(require("spok"));
const helpers_2 = require("./helpers");
const src_1 = require("../../../src");
(0, helpers_1.killStuckProcess)();
(0, tape_1.default)('candyMachineGPA: candyMachineByAuthorityAndUuid', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const mx = yield (0, helpers_1.metaplex)();
    let firstUuid;
    {
        // Given I create one candy machine with a particular authority
        const { authorityAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
        firstUuid = candyMachine.uuid;
        // When I get the candy machines for the authority and uuid
        const cm = yield mx
            .candyMachines()
            .findByAuthorityAndUuid(authorityAddress, candyMachine.uuid);
        // It returns that candy machine
        t.ok(cm != null, 'returns candy machine');
        (0, spok_1.default)(t, cm, {
            $topic: 'candyMachine',
            authorityAddress: (0, helpers_1.spokSamePubkey)(authorityAddress),
            uuid: candyMachine.uuid,
        });
    }
    {
        // Given I create another candy machine with the same authority
        const { authorityAddress, walletAddress, candyMachine } = yield (0, helpers_2.createCandyMachineWithMinimalConfig)(mx);
        // When I get the candy machines for the authority and uuid
        const cm = yield mx
            .candyMachines()
            .findByAuthorityAndUuid(authorityAddress, candyMachine.uuid);
        // It returns the other candy machine
        t.ok(cm != null, 'returns candy machine');
        (0, spok_1.default)(t, cm, {
            $topic: 'candyMachine',
            authorityAddress: (0, helpers_1.spokSamePubkey)(authorityAddress),
            uuid: candyMachine.uuid,
        });
        // When I then set the uuid of the other candy machine to equal to the first
        t.comment('Updating second candy machine to have the same uuid as the first');
        yield mx.candyMachines().update({
            candyMachineAddress: cm.candyMachineAddress,
            walletAddress,
            authoritySigner: mx.identity(),
            uuid: firstUuid,
        });
        // And I get the candy machines for the authority for previuous uuid again
        try {
            t.comment('Getting cany machine for authority and second uuid');
            yield mx
                .candyMachines()
                .findByAuthorityAndUuid(authorityAddress, candyMachine.uuid);
            t.fail('should have thrown');
        }
        catch (err) {
            // Then it does not find that candy machine
            t.ok(err instanceof src_1.NoCandyMachineFoundForAuthorityMatchesUuidError, 'throws NoCandyMachineFoundForAuthorityMatchesUuidError');
        }
        // And when I get the candy machines for the authority for first uuid again
        try {
            t.comment('Getting cany machine for authority and first uuid');
            yield mx
                .candyMachines()
                .findByAuthorityAndUuid(authorityAddress, firstUuid);
            t.fail('should have thrown');
        }
        catch (err) {
            // Then it finds two candy machines and throws
            t.ok(err instanceof src_1.MoreThanOneCandyMachineFoundByAuthorityAndUuidError, 'throws MoreThanOneCandyMachineFoundByAuthorityAndUuidError');
        }
    }
}));
//# sourceMappingURL=findCandyMachinesByAuthorityAndUuid.test.js.map