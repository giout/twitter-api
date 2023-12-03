const sql = {
    selectFollowings: `SELECT u.* FROM twitter.users as u INNER JOIN twitter.follows as f ON u.user_id=f.user_following WHERE f.user_follower = $1  AND (alias iLIKE $2 || '%' OR first_name iLIKE $2 || '%' OR last_name iLIKE $2 || '%') ORDER BY creation_date DESC OFFSET $3 LIMIT $4`,

    selectFollowers: `SELECT u.* FROM twitter.users as u INNER JOIN twitter.follows as f ON u.user_id=f.user_follower WHERE f.user_following = $1 AND (alias iLIKE $2 || '%' OR first_name iLIKE $2 || '%' OR last_name iLIKE $2 || '%') ORDER BY creation_date DESC OFFSET $3 LIMIT $4`,
    
    selectAllBy: {
        aliasOrName:`SELECT * FROM twitter.users WHERE alias iLIKE $1 || '%' OR first_name iLIKE $1 || '%' OR last_name iLIKE $1 || '%' ORDER BY creation_date DESC OFFSET $2 LIMIT $3`,

        alias: 'SELECT * FROM twitter.users WHERE alias = $1',
        
        pk: 'SELECT * FROM twitter.users WHERE user_id = $1'
    },

    insert: 'INSERT INTO twitter.users (alias, first_name, last_name, biography, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',

    update: {
        alias: 'UPDATE twitter.users SET alias=$1 WHERE user_id=$2',
        first_name: 'UPDATE twitter.users SET first_name=$1 WHERE user_id=$2',
        last_name: 'UPDATE twitter.users SET last_name=$1 WHERE user_id=$2',
        biography: 'UPDATE twitter.users SET biography=$1 WHERE user_id=$2',
        password: 'UPDATE twitter.users SET password=$1 WHERE user_id=$2'
    },

    delete: `DELETE FROM twitter.users WHERE user_id=$1`
}

export default sql