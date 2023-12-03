const sql = {
    selectAllBy: {
        pk: 'SELECT * FROM twitter.posts WHERE post_id=$1 '
    },
}

export default sql