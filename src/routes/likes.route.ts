import { Router } from "express"
import { handleLike } from "../controllers/likes.controller"
import { authentication } from "../middlewares/auth"

const router = Router()

// protect routes with authentication layer
router.use(authentication)

router.route('/')
    .post(handleLike)

export default router