import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userExists, userIsAuth } from "../utils/users"
import { createTweetByUser, deleteTweetByPk, findAllTweets, updateTweetByPk } from "../services/tweets.service"
import { tweetExists } from "../utils/tweets"
import { postBelongsToUser, setLikes } from "../utils/posts"
import { findCommentsByTweet } from "../services/comments.service"

export const createTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, tweet_content } = req.body

        if (!(user_id && tweet_content))
            throw new CustomError('Data is missing.', 400)
        
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

        await setLikes(req, [tweet])
        
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

export const getCommentsByTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        let offset, limit

        // paginacion
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        await tweetExists(id)

        const comments = await findCommentsByTweet(id, offset, limit)
        
        await setLikes(req, comments)

        res.status(200).json(comments)
    } catch(e) {
        next(e)
    }
}

export const getAllTweets = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        let content, order, offset, limit

        // filtrado
        content = <string> req.query.content || ''

        // ordenamiento
        order = <string> req.query.order || ''

        // paginacion
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        const tweets = await findAllTweets(content, order, offset, limit)

        await setLikes(req, tweets)

        res.status(200).json(tweets)
    } catch(e) {
        next(e)
    }
}
