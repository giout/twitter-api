"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_controller_1 = require("../controllers/likes.controller");
const router = (0, express_1.Router)();
router.route('/')
    .post(likes_controller_1.handleLike);
exports.default = router;
