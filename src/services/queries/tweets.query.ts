const sql = {
    selectAll: 'SELECT * FROM posts WHERE comment_to IS NULL ORDER BY creation_date DESC OFFSET $1 LIMIT $2',
    selectAllBy: {
        user: 'SELECT * FROM posts WHERE user_id=$1 AND comment_to IS NULL OFFSET $2 LIMIT $3',
        pk: 'SELECT * FROM posts WHERE post_id=$1 AND comment_to IS NULL'
    },

    insert: 'INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING *',

    update: {
        content: 'UPDATE posts SET post_content=$1 WHERE post_id=$2'
    }, 
    
    delete: 'DELETE FROM posts WHERE post_id=$1'
}

export default sql