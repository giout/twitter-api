"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareCrypted = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encrypt = (text, saltRounds) => {
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    return bcrypt_1.default.hashSync(text, salt);
};
exports.encrypt = encrypt;
const compareCrypted = (text, hash) => {
    return bcrypt_1.default.compareSync(text, hash);
};
exports.compareCrypted = compareCrypted;
