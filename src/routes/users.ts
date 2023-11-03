import { Router } from "express"
import { getAllUsers, getAuthUser, getUserByPk, getUserFeed, getUserFollowers as getUserF, getUserTweets, removeUser, updateUser, getUserFollowing } from '../controllers/users.controller'

const router = Router()

// obtener usuarios
// parametros activos -> filter (representa username o first-name o last-name)
// paginacion
// GET users
router.get('/', getAllUsers)

// obtener usuario validado por JWT
// GET users/me
router.get('/me', getAuthUser)

// obtener usuario por pk
//  GET users/:id

// actualizar usuario
// PUT users/:id

// eliminar usuario
// DELETE users/:id

router.route('/:id')
    .get(getUserByPk)
    .put(updateUser)
    .delete(removeUser)

// obtener tweets de usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/tweets
router.get('/:id/tweets', getUserTweets)

// obtener feed de un usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/feed
router.get('/:id/feed', getUserFeed)

// obtener seguidores de un usuario
// paginacion
// GET users/:id/followers
router.get('/:id/followers', getUserF)

// obtener seguidos de un usuario
// paginacion
// GET users/:id/following
router.get('/:id/following', getUserFollowing)

export default router