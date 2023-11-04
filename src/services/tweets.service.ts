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
    `WHERE post_id=$1 AND comment_to IS NULL`

    const tweets = await pool.query(sentence, [id])

    if (tweets.rows[0])
        return tweets.rows[0]

    return 
}

export const createTweetByUser = async (userId: string, content: string) => {
    const sentence = 
    `INSERT INTO posts (user_id, post_content) 
    VALUES ($1, $2)
    RETURNING *`

    const tweet = await pool.query(sentence, [userId, content])

    return tweet.rows[0]
}

export const updateTweetByPk = async (id: string, content: string) => {
    const sentence = 
    `UPDATE posts SET post_content=$1 WHERE post_id=$2`

    if (content)
        await pool.query(sentence, [content, id])

    return findTweetByPk(id)
}

export const deleteTweetsByPk = async (id: string) => {
    const sentence = 
    `DELETE FROM posts WHERE post_id=$1`

    await pool.query(sentence, [id])
}