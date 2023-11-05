import { findTweetByPk } from "../services/tweets.service"
import CustomError from "./CustomError"
import { userIsAuth } from "./users"
import { Request } from 'express'

// comprueba que el tweet pertenence al usuario que esta autenticado en la api
export const tweetBelongsToUser = async (req: Request, id: string) => {
    const tweet = await findTweetByPk(id)
    const userId = tweet.user_id

    userIsAuth(req, userId)    
}

export const tweetExists = async (id: string) => {
    const tweet = await findTweetByPk(id)
    
    if (!tweet)
        throw new CustomError('El tweet no existe', 400)

    return tweet
}