import pool from "../config/database"

const selectAll = 'SELECT * FROM posts as p '

export const findTweetsByUser = async (userId: string) => {
    const sentence = selectAll +
    `WHERE user_id=$1 AND comment_to IS NULL`

    const tweets = await pool.query(sentence, [userId])

    return tweets.rows
}

export const createTweetByUser = async (userId: string, content: string) => {
    const sentence = 
    `INSERT INTO posts (user_id, tweet_content) 
    VALUES ($1, $2)
    RETURNING *`

    const tweet = await pool.query(sentence, [userId, content])

    return tweet.rows[0]
}