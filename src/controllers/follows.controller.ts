import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userIsAuth } from "../utils/users"
import { createFollow, deleteFollow, findFollow } from "../services/follows.service"

export const handleFollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_follower, user_following } = req.body

        if (!(user_follower && user_following))
            throw new CustomError('Faltan campos por enviar', 400)

        // se comprueba que el usuario que quiere seguir sea el autenticado
        userIsAuth(req, user_follower)

        // si ya el post tiene like, se elimina, y si no existe, se crea
        const like = await findFollow(user_follower, user_following)
        
        if (like) {
            await deleteFollow(user_follower, user_following)
            return res.status(200).json({ msg: 'Se ha dejado de seguir al usuario' })
        }

        await createFollow(user_follower, user_following)
        res.status(201).json({ msg: 'Se ha seguido al usuario' })
    } catch (e) {
        next(e)
    }
}