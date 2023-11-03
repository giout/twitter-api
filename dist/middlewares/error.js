"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomError_1.default) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Internal server error." });
};
exports.errorHandler = errorHandler;
