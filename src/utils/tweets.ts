import { findTweetByPk } from "../services/tweets.service"
import CustomError from "./CustomError"

export const tweetExists = async (id: string) => {
    const tweet = await findTweetByPk(id)
    
    if (!tweet)
        throw new CustomError('El tweet no existe', 400)

    return tweet
}