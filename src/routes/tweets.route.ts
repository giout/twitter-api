import { Router } from "express"
import { createTweet, getCommentsByTweet, getTweetById, removeTweet, updateTweet, getAllTweets } from '../controllers/tweets.controller'
import { authentication } from "../middlewares/auth"

const router = Router()

router.use(authentication)


router.get('/', getAllTweets)

router.post('/', createTweet)

router.route('/:id')
    .get(getTweetById)
    .put(updateTweet)
    .delete(removeTweet)
    
router.get('/:id/comments', getCommentsByTweet)

export default router