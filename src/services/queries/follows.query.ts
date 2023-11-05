const sql = {
    selectFollowers: 'SELECT user_follower as user_id FROM follows WHERE user_following=$1',
    selectFollowings: 'SELECT user_following as user_id FROM follows WHERE user_follower=$1',
    selectAllBy: {
        followerAndFollowing: 'SELECT * FROM follows WHERE user_follower=$1 AND user_following=$2'
    },
    insert: 'INSERT INTO follows (user_follower, user_following) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM follows WHERE user_follower=$1 AND user_following=$2'
}

export default sql

