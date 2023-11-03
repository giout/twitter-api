"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const auth_2 = __importDefault(require("./auth"));
const auth_3 = __importDefault(require("./auth"));
const auth_4 = __importDefault(require("./auth"));
const auth_5 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/comments', auth_2.default);
router.use('/follows', auth_3.default);
router.use('/tweets', auth_4.default);
router.use('/users', auth_5.default);
exports.default = router;
