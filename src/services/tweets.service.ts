import pool from "../config/database"

const selectAll = 'SELECT * FROM posts as p '

export const findTweetsByUser = async (userId: string) => {
    const sentence = selectAll +
    `WHERE user_id=$1 AND comment_to IS NULL`

    const tweets = await pool.query(sentence, [userId])

    return tweets.rows
}

export const findTweetByPk = async (id: string) => {
    const sentence = selectAll +
    `WHERE tweet_id=$1 AND comment_to IS NULL`

    const tweets = await pool.query(sentence, [id])

    if (tweets.rows[0])
        return tweets.rows[0]

    return 
}

export const createTweetByUser = async (userId: string, content: string) => {
    const sentence = 
    `INSERT INTO posts (user_id, tweet_content) 
    VALUES ($1, $2)
    RETURNING *`

    const tweet = await pool.query(sentence, [userId, content])

    return tweet.rows[0]
}

export const updatedTweetByPk = async (id: string, entry: any) => {
    const { content } = entry
    const sentence = 
    `UPDATE tweets SET tweet_content`

}