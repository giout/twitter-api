import { Router } from "express"
import authRouter from './auth.route'
import commentRouter from './comments.route'
import followRouter from './follows.route'
import tweetRouter from './tweets.route'
import userRouter from './users.route'
import likeRouter from './likes.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/follows', followRouter)
router.use('/tweets', tweetRouter)
router.use('/users', userRouter)
router.use('/likes', likeRouter)

export default router