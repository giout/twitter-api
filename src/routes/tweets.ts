import { Router } from "express"
import { createTweet, getCommentsByTweet, getTweetById, removeTweet, updateTweet } from '../controllers/tweets.controller'
import { authentication } from "../middlewares/auth"

const router = Router()

router.use(authentication)

// crear tweet
// POST /tweets
router.post('/', createTweet)

// obtener tweet por pk
// GET /tweets/:id

// actualizar tweet
// PUT /tweets/:id

// eliminar tweet
// DELETE /tweets/:id

router.route('/:id')
    .get(getTweetById)
    .put(updateTweet)
    .delete(removeTweet)

// obtener comentarios de un tweet
// paginacion
// GET /tweets/:id/comments
router.get('/:id/comments', getCommentsByTweet)

export default router