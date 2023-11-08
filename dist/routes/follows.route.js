"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follows_controller_1 = require("../controllers/follows.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authentication);
router.route('/')
    .post(follows_controller_1.handleFollow);
exports.default = router;
