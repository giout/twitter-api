const sql = {
    selectAllBy: {
        user: 'SELECT * FROM posts WHERE user_id=$1 AND comment_to IS NULL',
        pk: 'SELECT * FROM posts WHERE post_id=$1 AND comment_to IS NOT NULL',
        tweet: 'SELECT * FROM posts WHERE comment_to=$1'
    },

    insert: 'INSERT INTO posts (user_id, post_content, comment_to) VALUES ($1, $2, $3) RETURNING *',

    update: {
        content: 'UPDATE posts SET post_content=$1 WHERE post_id=$2'
    }, 
    
    delete: 'DELETE FROM posts WHERE post_id=$1'
}

export default sql