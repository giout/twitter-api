import pool from "../config/database"
import sql from './queries/likes.query'

export const findLike = async (user_id: string , post_id: string) => {
    const likes = await pool.query(sql.selectAllBy.userAndPost, [post_id, user_id])

    if (likes.rows[0])
        return likes.rows[0]

    return 
}

export const createLike = async (user_id: string , post_id: string) => {
    const entry = await pool.query(sql.insert, [post_id, user_id])
    return entry
}

export const deleteLike = async (user_id: string , post_id: string) => {
    await pool.query(sql.delete, [post_id, user_id])
}