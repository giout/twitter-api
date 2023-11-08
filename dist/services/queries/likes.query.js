"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = {
    selectAllBy: {
        userAndPost: 'SELECT * FROM likes WHERE post_id=$1 AND user_id=$2'
    },
    insert: 'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM likes WHERE post_id=$1 AND user_id=$2'
};
exports.default = sql;
