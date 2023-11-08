"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authentication);
router.route('/:id')
    .get(comments_controller_1.getCommentById)
    .put(comments_controller_1.updateComment)
    .delete(comments_controller_1.deleteComment);
router.post('/', comments_controller_1.createCommentByTweet);
exports.default = router;
