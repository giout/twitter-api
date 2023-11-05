import { NextFunction, Request, Response } from "express"
import { postExists } from "../utils/posts"
import CustomError from "../utils/CustomError"
import { createLike, deleteLike, findLike } from "../services/likes.service"

export const handleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, post_id } = req.body

        if (!(user_id && post_id))
            throw new CustomError('Faltan campos por enviar', 400)

        await postExists(post_id)

        // si ya el post tiene like, se elimina, y si no existe, se crea
        const like = await findLike(user_id, post_id)
        
        if (like) {
            await deleteLike(user_id, post_id)
            return res.status(200).json({ msg: 'Se ha eliminado el like de la publicacion' })
        }

        await createLike(user_id, post_id)
        res.status(201).json({ msg: 'Se ha agregado un like a la publicacion' })
    } catch (e) {
        next(e)
    }
}