import { Router } from "express"
import { createCommentByTweet, deleteComment, getCommentById, updateComment } from "../controllers/comments.controller"
import { authentication } from "../middlewares/auth"

const router = Router()

// protect routes with authentication layer
router.use(authentication)

router.route('/:id')
    .get(getCommentById)
    .put(updateComment)
    .delete(deleteComment)
    
router.post('/', createCommentByTweet)

export default router