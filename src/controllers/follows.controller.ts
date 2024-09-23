import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userIsAuth, userExists } from "../utils/users"
import { createFollow, deleteFollow, findFollow } from "../services/follows.service"

export const handleFollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_follower, user_following } = req.body

        if (!(user_follower && user_following))
            throw new CustomError('Data is missing.', 400)

        
        await userExists(user_follower)
        await userExists(user_following)

        userIsAuth(req, user_follower)

        // if user is already followed, user is unfollowed
        const like = await findFollow(user_follower, user_following)
        
        if (like) {
            await deleteFollow(user_follower, user_following)
            return res.status(200).json({ msg: 'User unfollowed.' })
        }

        await createFollow(user_follower, user_following)
        res.status(201).json({ msg: 'User followed.' })
    } catch (e) {
        next(e)
    }
}