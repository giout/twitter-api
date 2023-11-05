import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userExists, userIsAuth } from "../utils/users"
import { createTweetByUser, deleteTweetByPk, updateTweetByPk } from "../services/tweets.service"
import { tweetExists } from "../utils/tweets"
import { postBelongsToUser } from "../utils/posts"

export const createTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, tweet_content } = req.body

        if (!(user_id && tweet_content))
            throw new CustomError('Faltan campos por llenar', 400)
        
        await userExists(user_id)
        userIsAuth(req, user_id)

        const createdTweet = await createTweetByUser(user_id, tweet_content)
        
        res.status(201).json(createdTweet)
    } catch(e) {
        next(e)
    }
}

export const getTweetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const tweet = await tweetExists(id)
        res.status(200).json(tweet)     
    } catch(e) {
        next(e)
    }
}

export const updateTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        await tweetExists(id)
        await postBelongsToUser(req, id)

        const { tweet_content } = req.body

        const updatedTweet = await updateTweetByPk(id, tweet_content)

        res.status(200).json(updatedTweet)
    } catch(e) {
        next(e)
    }
}

export const removeTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
    
        await tweetExists(id)
        await postBelongsToUser(req, id)
        
        await deleteTweetByPk(id)

        res.status(200).end()
    } catch(e) {
        next(e)
    }
}

export const getCommentsByTweet = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
    } catch(e) {
        next(e)
    }
}

