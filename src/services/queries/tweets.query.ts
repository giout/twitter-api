const queries = {
    select: {
        allByUser: 'SELECT * FROM posts WHERE user_id=$1 AND comment_to IS NULL',
        byPk: 'SELECT * FROM posts WHERE post_id=$1 AND comment_to IS NULL'
    },

    insert: 'INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING *',

    update: {
        content: 'UPDATE posts SET post_content=$1 WHERE post_id=$2'
    }, 
    
    delete: 'DELETE FROM posts WHERE post_id=$1'
}

export default queries