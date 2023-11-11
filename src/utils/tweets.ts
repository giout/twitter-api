import { findTweetByPk } from "../services/tweets.service"
import CustomError from "./CustomError"

export const tweetExists = async (id: string) => {
    const tweet = await findTweetByPk(id)
    
    if (!tweet)
        throw new CustomError('Tweet does not exist.', 400)

    return tweet
}