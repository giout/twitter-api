const sql = {
    selectAllBy: {
        userAndPost: 'SELECT * FROM twitter.likes WHERE post_id=$1 AND user_id=$2'
    },
    insert: 'INSERT INTO twitter.likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM twitter.likes WHERE post_id=$1 AND user_id=$2'
}

export default sql

