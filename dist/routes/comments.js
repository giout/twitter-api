"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
// obtener comentario por id 
// GET /comments/:id
// actualizar comentario
// PUT /comments/:id
// eliminar comentario
// DELETE /comments/:id
router.route('/:id')
    .get(comments_controller_1.getCommentById)
    .put(comments_controller_1.updateComment)
    .delete(comments_controller_1.deleteComment);
// crear comentario
// POST /comments
router.post('/', comments_controller_1.createComment);
// like
// POST /comments/:id/like 
// unlike
// DELETE /comments/:id/like
router.route('/:id/like')
    .post(comments_controller_1.like)
    .delete(comments_controller_1.unlike);
exports.default = router;
