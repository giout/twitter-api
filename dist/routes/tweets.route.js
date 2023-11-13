"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweets_controller_1 = require("../controllers/tweets.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authentication);
router.get('/', tweets_controller_1.getAllTweets);
router.post('/', tweets_controller_1.createTweet);
router.route('/:id')
    .get(tweets_controller_1.getTweetById)
    .put(tweets_controller_1.updateTweet)
    .delete(tweets_controller_1.removeTweet);
router.get('/:id/comments', tweets_controller_1.getCommentsByTweet);
exports.default = router;
