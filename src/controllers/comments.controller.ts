import { NextFunction, Request, Response } from "express"
import { createCommentByTweetPk, deleteCommentByPk, findCommentByPk, updateCommentByPk } from "../services/comments.service"
import CustomError from "../utils/CustomError"
import { userExists, userIsAuth } from "../utils/users"
import { tweetExists } from "../utils/tweets"
import { commentExists } from "../utils/comments"
import { postBelongsToUser } from "../utils/posts"

export const getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const comment = await commentExists(id)
        res.status(200).json(comment)
    } catch (e) {
        next(e)
    }
}

export const createCommentByTweet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, comment_content, tweet_id } = req.body

        if (!(user_id && comment_content && tweet_id)) 
            throw new CustomError('Faltan campos por enviar', 400)

        await userExists(user_id)
        userIsAuth(req, user_id)
        await tweetExists(tweet_id)

        const createdComment = await createCommentByTweetPk(user_id, comment_content, tweet_id)

        res.status(201).json(createdComment)
    } catch (e) {
        next(e)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { comment_content } = req.body

        await commentExists(id)
        await postBelongsToUser(req, id)

        const updatedComment = await updateCommentByPk(id, comment_content)
        res.status(200).json(updatedComment)
    } catch (e) {
        next(e)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        await commentExists(id)
        await postBelongsToUser(req, id)

        await deleteCommentByPk(id)
        res.status(200).end()
    } catch (e) {
        next(e)
    }
}