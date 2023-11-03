"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweets_controller_1 = require("../controllers/tweets.controller");
const router = (0, express_1.Router)();
// crear tweet
// POST /tweets
router.post('/', tweets_controller_1.createTweet);
// obtener tweet por pk
// GET /tweets/:id
// actualizar tweet
// PUT /tweets/:id
// eliminar tweet
// DELETE /tweets/:id
router.route('/:id')
    .get(tweets_controller_1.getTweetByPk)
    .put(tweets_controller_1.updateTweet)
    .delete(tweets_controller_1.removeTweet);
// obtener comentarios de un tweet
// paginacion
// GET /tweets/:id/comments
router.get('/:id/comments', tweets_controller_1.getCommentsByTweet);
// like
// POST /tweets/:id/like 
// unlike
// DELETE /tweets/:id/like
router.route('/:id/like')
    .post(tweets_controller_1.likeTweet)
    .delete(tweets_controller_1.unlikeTweet);
exports.default = router;
