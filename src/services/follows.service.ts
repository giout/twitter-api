import pool from "../config/database"
import sql from './queries/follows.query'

export const findFollow = async (user_follower: string , user_following: string) => {
    const likes = await pool.query(sql.selectAllBy.followerAndFollowing, [user_follower, user_following])

    if (likes.rows[0])
        return likes.rows[0]

    return 
}

export const createFollow = async (user_follower: string , user_following: string) => {
    const entry = await pool.query(sql.insert, [user_follower, user_following])
    return entry
}

export const deleteFollow = async (user_follower: string , user_following: string) => {
    await pool.query(sql.delete, [user_follower, user_following])
}

