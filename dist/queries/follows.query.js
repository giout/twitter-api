"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = {
    selectAllBy: {
        followerAndFollowing: 'SELECT * FROM follows WHERE user_follower=$1 AND user_following=$2'
    },
    insert: 'INSERT INTO follows (user_follower, user_following) VALUES ($1, $2) RETURNING *',
    delete: 'DELETE FROM follows WHERE user_follower=$1 AND user_following=$2'
};
exports.default = sql;
