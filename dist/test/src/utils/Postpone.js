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
exports.Postpone = void 0;
const common_1 = require("../utils/common");
class Postpone {
    constructor(value) {
        this.value = value;
    }
    static make(value) {
        return new this(value);
    }
    asyncPipe(callback) {
        return Postpone.make(() => __awaiter(this, void 0, void 0, function* () { return callback(this.value()); }));
    }
    pipe(callback) {
        return this.asyncPipe((value) => __awaiter(this, void 0, void 0, function* () { return callback(yield value); }));
    }
    asyncTap(callback) {
        return this.asyncPipe((value) => __awaiter(this, void 0, void 0, function* () {
            callback(value);
            return value;
        }));
    }
    tap(callback) {
        return this.asyncTap((value) => __awaiter(this, void 0, void 0, function* () { return callback(yield value); }));
    }
    log() {
        return this.tap((v) => console.log(v));
    }
    map(callback) {
        return this.pipe((t) => t.map(callback));
    }
    flatMap(callback) {
        return this.pipe((t) => t.flatMap(callback));
    }
    chunk(size) {
        return this.pipe((t) => (0, common_1.chunk)(t, size));
    }
    filter(callback) {
        return this.pipe((t) => t.filter(callback));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.value();
        });
    }
}
exports.Postpone = Postpone;
//# sourceMappingURL=Postpone.js.map