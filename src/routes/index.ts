import { Router } from "express"
import authRouter from './auth'
import commentRouter from './auth'
import followRouter from './auth'
import tweetRouter from './auth'
import userRouter from './auth'

const router = Router()

router.use('/auth', authRouter)
router.use('/comments', authRouter)
router.use('/follows', authRouter)
router.use('/tweets', authRouter)
router.use('/users', authRouter)

export default router