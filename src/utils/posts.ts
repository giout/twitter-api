import { findPostByPk } from "../services/posts.service"
import CustomError from "./CustomError"
import { userIsAuth } from "./users"
import { Request } from "express"
import { AuthRequest } from "../types/auth"
import { findLike } from "../services/likes.service"

// tweets and comments belong to the same entity (posts), and both of them can be managed as equal in some scenarios
export const postExists = async (id: string) => {
    const post = await findPostByPk(id)

    if (!post)
        throw new CustomError('Post does not exist.', 404)
}

// verify if post belongs to user that is authenticated
export const postBelongsToUser = async (req: Request, id: string) => {
    const post = await findPostByPk(id)
    const userId = post.user_id

    userIsAuth(req, userId)    
}

// verify if user liked the retrieved posts
export const setLikes = async (req: Request, posts: any[]) => {
    const { user } = (req as AuthRequest)
    for (let i=0; i < posts.length; i++) {
        let like = await findLike(user.id, posts[i].post_id)
        // add new property
        posts[i].liked = like != undefined   
    }
}