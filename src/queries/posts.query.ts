const sql = {
    selectAllBy: {
        pk: 'SELECT * FROM posts WHERE post_id=$1 '
    },
}

export default sql