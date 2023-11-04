import pool from "../config/database"
import sql from "./queries/comments.query"

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