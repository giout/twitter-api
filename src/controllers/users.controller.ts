import { NextFunction, Request, Response } from "express"
import { deleteUser, findUsers, updateUserByPk } from "../services/users.service"
import { AuthRequest } from "../types/auth"
import { encrypt } from "../utils/bcrypt"
import { findTweetsByUser, findTweetsLikedByUser } from "../services/tweets.service"
import { userExists, userIsAuth, verifyFollow } from "../utils/users"
import { findFollowersByPk, findFollowingsByPk } from "../services/users.service"
import { setLikes } from "../utils/posts"
import { findCommentsByUser } from "../services/comments.service"
import { validatePassword } from "../utils/validation"
import CustomError from "../utils/CustomError"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let search, offset, limit

        // filter
        search = <string> req.query.search || '' 

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        const users = await findUsers(search, offset, limit)

        await verifyFollow(req, users)

        res.status(200).json(users)
    } catch(e) {
        next(e)
    }
}

export const getAuthUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtain token payload
        const { user } = req as AuthRequest

        await userExists(user.id)

        res.status(200).json({ user_id: user.id })
    } catch(e) {
        next(e)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await userExists(id)

        await verifyFollow(req, [user])

        res.status(200).json(user)
    } catch(e) {
        next(e)
    }   
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        await userExists(id)
        userIsAuth(req, id)

        const { password } = req.body

        if (password) {
            if (!validatePassword(password)) {
                throw new CustomError('Password must contain at least 8 characters, letters and numbers.', 400)
            }
            req.body.password = encrypt(password)
        }
    
        const updatedUser = await updateUserByPk(id, req.body)
        res.status(200).json(updatedUser)
    } catch(e) {
        next(e)
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        userExists(id)
        userIsAuth(req, id)
        
        await deleteUser(id) 
        res.status(200).end()
    } catch(e) {
        next(e)
    }
}

export const getUserTweets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let order, offset, limit

        // order
        order = <string> req.query.order || ''

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        await userExists(id)
        const tweets = await findTweetsByUser(id, order, offset, limit)

        await setLikes(req, tweets)

        res.status(200).json(tweets)
    } catch(e) {
        next(e)
    }
}

export const getUserComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let offset, limit

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        await userExists(id)
        const comments = await findCommentsByUser(id, offset, limit)

        await setLikes(req, comments)

        res.status(200).json(comments)
    } catch(e) {
        next(e)
    }
}

export const getUserFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let search, offset, limit

        // filter
        search = <string> req.query.search || ''

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        await userExists(id)

        const followers = await findFollowersByPk(id, search, offset, limit)

        res.status(200).json(followers)
    } catch(e) {
        next(e)
    }
}

export const getUserFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let search, offset, limit

        // filter
        search = <string> req.query.search || ''

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null

        await userExists(id)

        const followings = await findFollowingsByPk(id, search, offset, limit)

        res.status(200).json(followings)
    } catch(e) {
        next(e)
    }
}

export const getUserLikedTweets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        let offset, limit
        
        await userExists(id)

        // paginate
        offset = <string> req.query.offset || null
        limit = <string> req.query.limit || null
        
        const tweets = await findTweetsLikedByUser(id, offset, limit)

        await setLikes(req, tweets)

        res.status(200).json(tweets)
    } catch (e) {
        next(e)
    }
}