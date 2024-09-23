import { Router } from "express"
import { handleFollow } from "../controllers/follows.controller"
import { authentication } from "../middlewares/auth"

const router = Router()

// protect routes with authentication layer
router.use(authentication)

router.route('/')
    .post(handleFollow)
    
export default router