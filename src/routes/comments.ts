import { Router } from "express"
import { createCommentByTweet, deleteComment, getCommentById, like, unlike, updateComment } from "../controllers/comments.controller"
import { authentication } from "../middlewares/auth"

const router = Router()

router.use(authentication)
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
router.post('/', createCommentByTweet)

// like
// POST /comments/:id/like 

// unlike
// DELETE /comments/:id/like
router.route('/:id/like')
    .post(like)
    .delete(unlike)

export default router