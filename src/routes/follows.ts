import { Router } from "express"
import { follow, unfollow } from "../controllers/follows.controller"

const router = Router()

// seguir
// POST /follows/:id

// dejar de seguir
// DELETE /follows/:id

router.route('/:id')
    .post(follow)
    .delete(unfollow)

export default router