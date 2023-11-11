"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = {
    selectAllBy: {
        pk: 'SELECT * FROM posts WHERE post_id=$1 '
    }
};
exports.default = sql;
