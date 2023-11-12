"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommentsByUser = exports.findCommentsByTweet = exports.deleteCommentByPk = exports.updateCommentByPk = exports.createCommentByTweetPk = exports.findCommentByPk = void 0;
const database_1 = __importDefault(require("../config/database"));
const comments_query_1 = __importDefault(require("../queries/comments.query"));
const findCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield database_1.default.query(comments_query_1.default.selectAllBy.pk, [id]);
    if (comment.rows[0])
        return comment.rows[0];
    return;
});
exports.findCommentByPk = findCommentByPk;
const createCommentByTweetPk = (userId, content, tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    const entry = yield database_1.default.query(comments_query_1.default.insert, [userId, content, tweetId]);
    const id = entry.rows[0].post_id;
    return (0, exports.findCommentByPk)(id);
});
exports.createCommentByTweetPk = createCommentByTweetPk;
const updateCommentByPk = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    if (content)
        yield database_1.default.query(comments_query_1.default.update.content, [content, id]);
    return (0, exports.findCommentByPk)(id);
});
exports.updateCommentByPk = updateCommentByPk;
const deleteCommentByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(comments_query_1.default.delete, [id]);
});
exports.deleteCommentByPk = deleteCommentByPk;
const findCommentsByTweet = (tweet_id, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield database_1.default.query(comments_query_1.default.selectAllBy.tweet, [tweet_id, offset, limit]);
    return comments.rows;
});
exports.findCommentsByTweet = findCommentsByTweet;
const findCommentsByUser = (user_id, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield database_1.default.query(comments_query_1.default.selectAllBy.user, [user_id, offset, limit]);
    return comments.rows;
});
exports.findCommentsByUser = findCommentsByUser;
