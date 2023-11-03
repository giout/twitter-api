"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follows_controller_1 = require("../controllers/follows.controller");
const router = (0, express_1.Router)();
// seguir
// POST /follows/:id
// dejar de seguir
// DELETE /follows/:id
router.route('/:id')
    .post(follows_controller_1.follow)
    .delete(follows_controller_1.unfollow);
exports.default = router;
