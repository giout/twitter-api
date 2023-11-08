import pool from "../config/database"
import sql from "../queries/comments.query"

export const findCommentByPk = async (id: string) => {
    const comment = await pool.query(sql.selectAllBy.pk, [id])

    if (comment.rows[0])
        return comment.rows[0]

    return 
}

export const createCommentByTweetPk = async (userId: string, content: string, tweetId: string) => {
    const entry = await pool.query(sql.insert, [userId, content, tweetId])
    return entry.rows[0]
}

export const updateCommentByPk = async (id: string, content: string) => {
    if (content)
        await pool.query(sql.update.content, [content, id])

    return findCommentByPk(id)
}

export const deleteCommentByPk = async (id: string) => {
    await pool.query(sql.delete, [id])
}

export const findCommentsByTweet = async (tweet_id: string, offset: string|null, limit: string|null) => {
    const comments = await pool.query(sql.selectAllBy.tweet, [tweet_id, offset, limit])
    return comments.rows
}