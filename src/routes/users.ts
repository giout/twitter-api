import { Router } from "express"

const router = Router()

// obtener usuarios
// parametros activos -> filter (representa username o first-name o last-name)
// paginacion
// GET users

// obtener usuario validado por JWT
// GET users/me

// obtener usuario por pk
//  GET users/:id

// actualizar usuario
// PUT users/:id

// eliminar usuario
// DELETE users/:id

// obtener tweets de usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/tweets

// obtener feed de un usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/feed

// obtener seguidores de un usuario
// paginacion
// GET users/:id/followers

// obtener seguidos de un usuario
// paginacion
// GET users/:id/following

export default router