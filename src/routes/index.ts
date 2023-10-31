import { Router } from "express"
import userRouter from './users'
import authRouter from './auth'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)


export default router