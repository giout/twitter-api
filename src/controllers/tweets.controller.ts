import { NextFunction, Request, Response } from "express"
import CustomError from "../utils/CustomError"
import { userExists } from "./users.controller"
import { createTweetByUser } from "../services/tweets.service"


export const createTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, tweet_content } = req.body

        if (!(user_id && tweet_content))
            throw new CustomError('Faltan campos por llenar', 400)
        
        await userExists(req, user_id)

        const createdTweet = await createTweetByUser(user_id, tweet_content)
        
        res.status(201).json(createdTweet)
    } catch(e) {
        next(e)
    }
}

export const getTweetById = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
    } catch(e) {
        next(e)
    }
}

export const updateTweet = (req: Request, res: Response, next: NextFunction) => {
    try {
                    
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