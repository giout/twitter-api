import { NextFunction, Request, Response } from "express"
import { postExists } from "../utils/posts"
import CustomError from "../utils/CustomError"
import { createLike, deleteLike, findLike } from "../services/likes.service"
import { userIsAuth } from "../utils/users"

export const handleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, post_id } = req.body

        if (!(user_id && post_id))
            throw new CustomError('Data is missing.', 400)

        await postExists(post_id)

        //userIsAuth(req, user_id)

        // si ya el post tiene like, se elimina, y si no existe, se crea
        const like = await findLike(user_id, post_id)
        
        if (like) {
            await deleteLike(user_id, post_id)
            return res.status(200).json({ msg: 'Like has been removed from post.' })
        }

        await createLike(user_id, post_id)
        res.status(201).json({ msg: 'Like has been added to post.' })
    } catch (e) {
        next(e)
    }
}