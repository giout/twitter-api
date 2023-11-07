const sql = {
    selectFollowers: 'SELECT * FROM users WHERE user_id IN ( SELECT user_follower FROM follows WHERE user_following=$1 ) ORDER BY creation_date DESC OFFSET $2 LIMIT $3',

    selectFollowings: 'SELECT * FROM users WHERE user_id IN ( SELECT user_following FROM follows WHERE user_follower=$1 ) ORDER BY creation_date DESC OFFSET $2 LIMIT $3',
    
    selectAllBy: {
        aliasOrName:`SELECT * FROM users WHERE alias iLIKE $1 || '%' OR first_name iLIKE $1 || '%' OR last_name iLIKE $1 || '%' ORDER BY creation_date DESC OFFSET $2 LIMIT $3`,

        alias: 'SELECT * FROM users WHERE alias = $1',
        
        pk: 'SELECT * FROM users WHERE user_id = $1'
    },

    insert: 'INSERT INTO users (alias, first_name, last_name, biography, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',

    update: {
        alias: 'UPDATE users SET alias=$1 WHERE user_id=$2',
        first_name: 'UPDATE users SET first_name=$1 WHERE user_id=$2',
        last_name: 'UPDATE users SET last_name=$1 WHERE user_id=$2',
        biography: 'UPDATE users SET biography=$1 WHERE user_id=$2',
        password: 'UPDATE users SET password=$1 WHERE user_id=$2'
    },

    delete: `DELETE FROM users WHERE user_id=$1`
}

export default sql