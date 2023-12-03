const data = `u.alias, u.first_name, u.last_name, p.*`
const joinPostUser = `twitter.posts as p INNER JOIN twitter.users as u ON p.user_id=u.user_id`
const isTweet = `comment_to IS NULL`

const sql = {
    selectAll: {
        lessPopular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND post_content iLIKE '%' || $1 || '%' ORDER BY post_likes ASC OFFSET $2 LIMIT $3`,
        popular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND post_content iLIKE '%' || $1 || '%' ORDER BY post_likes DESC OFFSET $2 LIMIT $3`,
        oldest: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND post_content iLIKE '%' || $1 || '%' ORDER BY creation_date ASC OFFSET $2 LIMIT $3`,
        new: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND post_content iLIKE '%' || $1 || '%' ORDER BY creation_date DESC OFFSET $2 LIMIT $3`
    },

    selectAllBy: {
        user: {
            lessPopular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY post_likes ASC OFFSET $2 LIMIT $3`,
            popular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY post_likes DESC OFFSET $2 LIMIT $3`,
            oldest: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY creation_date ASC OFFSET $2 LIMIT $3`,
            new: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY creation_date DESC OFFSET $2 LIMIT $3`            
        },
        pk: `SELECT ${data} FROM ${joinPostUser} WHERE post_id=$1 AND ${isTweet}`,
        userLike: `SELECT ${data} FROM ${joinPostUser} INNER JOIN twitter.likes as l ON p.post_id=l.post_id WHERE ${isTweet} AND l.user_id=$1 ORDER BY p.creation_date DESC OFFSET $2 LIMIT $3`
    },

    insert: `INSERT INTO twitter.posts (user_id, post_content, image_url) VALUES ($1, $2, $3) RETURNING *`,
    
    update: {
        content: `UPDATE twitter.posts SET post_content=$1 WHERE post_id=$2`
    }, 
    
    delete: `DELETE FROM twitter.posts WHERE post_id=$1`
}

export default sql