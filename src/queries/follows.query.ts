const sql = {
    selectAllBy: {
        followerAndFollowing: 'SELECT * FROM twitter.follows WHERE user_follower=$1 AND user_following=$2'
    },
    insert: 'INSERT INTO twitter.follows (user_follower, user_following) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM twitter.follows WHERE user_follower=$1 AND user_following=$2'
}

export default sql

