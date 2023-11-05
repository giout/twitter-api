import { findPostByPk } from "../services/posts.service"
import CustomError from "./CustomError"
import { userIsAuth } from "./users"
import { Request } from "express"

// los tweets y comentarios pertenecen a la misma entidad (posts), y en algunos escenarios seran tratados por igual
export const postExists = async (id: string) => {
    const post = await findPostByPk(id)

    if (!post)
        throw new CustomError('La publicacion no existe', 400)
}

// verifica si el post pertenence al usuario que esta autenticado en la api
export const postBelongsToUser = async (req: Request, id: string) => {
    const post = await findPostByPk(id)
    const userId = post.user_id

    userIsAuth(req, userId)    
}