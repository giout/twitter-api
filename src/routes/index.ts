import { Router } from "express"
import authRouter from './auth'
import commentRouter from './comments'
import followRouter from './follows'
import tweetRouter from './tweets'
import userRouter from './users'
import likeRouter from './likes'

const router = Router()

router.use('/auth', authRouter)
router.use('/comments', commentRouter)
router.use('/follows', followRouter)
router.use('/tweets', tweetRouter)
router.use('/users', userRouter)
router.use('/likes', likeRouter)

export default router