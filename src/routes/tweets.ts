import { Router } from "express"
import { createTweet, getCommentsByTweet, getTweetByPk, likeTweet, removeTweet, unlikeTweet, updateTweet } from '../controllers/tweets.controller'

const router = Router()

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
    .get(getTweetByPk)
    .put(updateTweet)
    .delete(removeTweet)

// obtener comentarios de un tweet
// paginacion
// GET /tweets/:id/comments
router.get('/:id/comments', getCommentsByTweet)

// like
// POST /tweets/:id/like 

// unlike
// DELETE /tweets/:id/like

router.route('/:id/like')
    .post(likeTweet)
    .delete(unlikeTweet)

export default router