import { Router } from "express"
import { createCommentByTweet, deleteComment, getCommentById, updateComment } from "../controllers/comments.controller"
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

export default router