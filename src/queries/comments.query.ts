const data = `u.alias, u.first_name, u.last_name, p.*`
const joinPostUser = `posts as p INNER JOIN users as u ON p.user_id=u.user_id`
const isComment = `comment_to IS NOT NULL`

const sql = {
    selectAllBy: {
        user: `SELECT ${data} FROM ${joinPostUser} WHERE p.user_id=$1 AND ${isComment} ORDER BY creation_date DESC`,
        pk: `SELECT ${data} FROM ${joinPostUser} WHERE post_id=$1 AND ${isComment}`,
        tweet: `SELECT ${data} FROM ${joinPostUser} WHERE comment_to=$1 ORDER BY creation_date DESC OFFSET $2 LIMIT $3`
    },

    insert: `INSERT INTO posts (user_id, post_content, comment_to) VALUES ($1, $2, $3) RETURNING ${data}`,

    update: {
        content: `UPDATE posts SET post_content=$1 WHERE post_id=$2`
    }, 
    
    delete: `DELETE FROM posts WHERE post_id=$1`
}

export default sql