import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userExists, userIsAuth } from "./users.controller"
import { createTweetByUser, findTweetByPk } from "../services/tweets.service"


export const createTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, tweet_content } = req.body

        if (!(user_id && tweet_content))
            throw new CustomError('Faltan campos por llenar', 400)
        
        await userExists(user_id)

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
        await tweetBelongsToUser(req, id)

        //const updatedTweet = await 
    } catch(e) {
        next(e)
    }
}

export const removeTweet = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
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

export const likeTweet = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
    } catch(e) {
        next(e)
    }
}

export const unlikeTweet = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
    } catch(e) {
        next(e)
    }
}

// comprueba que el tweet pertenence al usuario que esta autenticado en la api
export const tweetBelongsToUser = async (req: Request, id: string) => {
    const tweet = await findTweetByPk(id)
    const userId = tweet.user_id

    userIsAuth(req, userId)    
}

export const tweetExists = async (id: string) => {
    const tweet = await findTweetByPk(id)
    
    if (!tweet)
        throw new CustomError('El usuario no existe', 400)

    return tweet
}