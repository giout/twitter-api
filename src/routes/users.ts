import { Router } from "express"
import controller from '../controllers/users'

const router = Router()

router.get('/:param', controller.searchUsers)
router.put('/', controller.updateThisUser)
router.delete('/', controller.removeThisUser)

export default router