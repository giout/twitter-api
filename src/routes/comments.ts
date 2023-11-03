import { Router } from "express"
import { createComment, deleteComment, getCommentById, like, unlike, updateComment } from "../controllers/comments.controller"

const router = Router()

// obtener comentario por id 
// GET /comments/:id

// actualizar comentario
// PUT /comments/:id

// eliminar comentario
// DELETE /comments/:id
router.route('/:id')
    .get(getCommentById)
    .put(updateComment)
    .delete(deleteComment)

// crear comentario
// POST /comments
router.post('/', createComment)

// like
// POST /comments/:id/like 

// unlike
// DELETE /comments/:id/like
router.route('/:id/like')
    .post(like)
    .delete(unlike)

export default router