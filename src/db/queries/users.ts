const queries = {
    selectAll: `SELECT * FROM users`,
    insert: `INSERT INTO users (alias, first_name, last_name, followers_count, biography) VALUES ($1, $2, $3, $4, $5)`,
    selectByPk: `SELECT * FROM users WHERE user_id=$1`,
    delete: `DELETE FROM users WHERE user_id=$1`,
    update: `UPDATE users SET alias=$1, first_name=$2, last_name=$3, biography=$4 WHERE user_id=$5`,
}

export default queries