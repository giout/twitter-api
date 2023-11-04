import pool from "../config/database"
import sql from "./queries/tweets.query"

export const findTweetsByUser = async (userId: string) => {
    const sentence = sql.selectAllBy.user

    const tweets = await pool.query(sentence, [userId])

    return tweets.rows
}

export const findTweetByPk = async (id: string) => {
    const sentence = sql.selectAllBy.pk

    const tweets = await pool.query(sentence, [id])

    if (tweets.rows[0])
        return tweets.rows[0]

    return 
}

export const createTweetByUser = async (userId: string, content: string) => {
    const tweet = await pool.query(sql.insert, [userId, content])

    return tweet.rows[0]
}

export const updateTweetByPk = async (id: string, content: string) => {
    if (content)
        await pool.query(sql.update.content, [content, id])

    return findTweetByPk(id)
}

export const deleteTweetByPk = async (id: string) => {
    await pool.query(sql.delete, [id])
}