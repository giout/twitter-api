import { Router } from "express"
import controller from '../controllers/auth'

const router = Router()

// rutas desprotegidas
router.post('/login', controller.logIn)
router.post('/signup', controller.signUp)

export default router