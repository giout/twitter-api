import { findPostByPk } from "../services/posts.service"
import CustomError from "./CustomError"
import { userIsAuth } from "./users"
import { Request } from "express"
import { AuthRequest } from "../types/auth"
import { findLike } from "../services/likes.service"

// los tweets y comentarios pertenecen a la misma entidad (posts), y en algunos escenarios seran tratados por igual
export const postExists = async (id: string) => {
    const post = await findPostByPk(id)

    if (!post)
        throw new CustomError('Post does not exist.', 400)
}

// verifica si el post pertenence al usuario que esta autenticado en la api
export const postBelongsToUser = async (req: Request, id: string) => {
    const post = await findPostByPk(id)
    const userId = post.user_id

    userIsAuth(req, userId)    
}

// determina si el usuario le ha dado like a los posts ingresados
export const setLikes = async (req: Request, posts: any[]) => {
    const { user } = (req as AuthRequest)
    for (let i=0; i < posts.length; i++) {
        let like = await findLike(user.id, posts[i].post_id)
        // se agrega la nueva propiedad
        posts[i].liked = like != undefined   
    }
}