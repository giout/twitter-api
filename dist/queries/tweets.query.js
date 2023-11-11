"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = `u.alias, u.first_name, u.last_name, p.*`;
const joinPostUser = 'posts as p INNER JOIN users as u ON p.user_id=u.user_id';
const isTweet = 'comment_to IS NULL';
const sql = {
    selectAll: {
        lessPopular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} ORDER BY post_likes ASC OFFSET $1 LIMIT $2`,
        popular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} ORDER BY post_likes DESC OFFSET $1 LIMIT $2`,
        oldest: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} ORDER BY creation_date ASC OFFSET $1 LIMIT $2`,
        new: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} ORDER BY creation_date DESC OFFSET $1 LIMIT $2`
    },
    selectAllBy: {
        user: {
            lessPopular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY post_likes ASC OFFSET $2 LIMIT $3`,
            popular: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY post_likes DESC OFFSET $2 LIMIT $3`,
            oldest: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY creation_date ASC OFFSET $2 LIMIT $3`,
            new: `SELECT ${data} FROM ${joinPostUser} WHERE ${isTweet} AND p.user_id=$1 ORDER BY creation_date DESC OFFSET $2 LIMIT $3`
        },
        pk: `SELECT ${data} FROM ${joinPostUser} WHERE post_id=$1 AND ${isTweet}`
    },
    insert: `INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING ${data}`,
    update: {
        content: `UPDATE posts SET post_content=$1 WHERE post_id=$2`
    },
    delete: `DELETE FROM posts WHERE post_id=$1`
};
exports.default = sql;
