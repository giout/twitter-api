import { Router } from "express"
import { handleLike } from "../controllers/likes.controller"

const router = Router()

router.route('/')
    .post(handleLike)

export default router