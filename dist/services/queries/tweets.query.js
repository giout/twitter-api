"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = {
    selectAll: {
        lessPopular: 'SELECT * FROM posts WHERE comment_to IS NULL ORDER BY post_likes ASC OFFSET $1 LIMIT $2',
        popular: 'SELECT * FROM posts WHERE comment_to IS NULL ORDER BY post_likes DESC OFFSET $1 LIMIT $2',
        oldest: 'SELECT * FROM posts WHERE comment_to IS NULL ORDER BY creation_date ASC OFFSET $1 LIMIT $2',
        new: 'SELECT * FROM posts WHERE comment_to IS NULL ORDER BY creation_date DESC OFFSET $1 LIMIT $2'
    },
    selectAllBy: {
        user: {
            lessPopular: 'SELECT * FROM posts WHERE comment_to IS NULL AND user_id=$1 ORDER BY post_likes ASC OFFSET $2 LIMIT $3',
            popular: 'SELECT * FROM posts WHERE comment_to IS NULL AND user_id=$1 ORDER BY post_likes DESC OFFSET $2 LIMIT $3',
            oldest: 'SELECT * FROM posts WHERE comment_to IS NULL AND user_id=$1 ORDER BY creation_date ASC OFFSET $2 LIMIT $3',
            new: 'SELECT * FROM posts WHERE comment_to IS NULL AND user_id=$1 ORDER BY creation_date DESC OFFSET $2 LIMIT $3'
        },
        pk: 'SELECT * FROM posts WHERE post_id=$1 AND comment_to IS NULL'
    },
    insert: 'INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING *',
    update: {
        content: 'UPDATE posts SET post_content=$1 WHERE post_id=$2'
    },
    delete: 'DELETE FROM posts WHERE post_id=$1'
};
exports.default = sql;
