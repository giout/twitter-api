"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = {
    selectFollowings: `SELECT u.* FROM users as u INNER JOIN follows as f ON u.user_id=f.user_following WHERE f.user_follower = $1  AND (alias iLIKE $2 || '%' OR first_name iLIKE $2 || '%' OR last_name iLIKE $2 || '%') ORDER BY creation_date DESC OFFSET $3 LIMIT $4`,
    selectFollowers: `SELECT u.* FROM users as u INNER JOIN follows as f ON u.user_id=f.user_follower WHERE f.user_following = $1 AND (alias iLIKE $2 || '%' OR first_name iLIKE $2 || '%' OR last_name iLIKE $2 || '%') ORDER BY creation_date DESC OFFSET $3 LIMIT $4`,
    selectAllBy: {
        aliasOrName: `SELECT * FROM users WHERE alias iLIKE $1 || '%' OR first_name iLIKE $1 || '%' OR last_name iLIKE $1 || '%' ORDER BY creation_date DESC OFFSET $2 LIMIT $3`,
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
};
exports.default = sql;
