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
exports.deleteComment = exports.updateComment = exports.createCommentByTweet = exports.getCommentById = void 0;
const comments_service_1 = require("../services/comments.service");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const users_1 = require("../utils/users");
const tweets_1 = require("../utils/tweets");
const comments_1 = require("../utils/comments");
const posts_1 = require("../utils/posts");
const getCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield (0, comments_1.commentExists)(id);
        res.status(200).json(comment);
    }
    catch (e) {
        next(e);
    }
});
exports.getCommentById = getCommentById;
const createCommentByTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, comment_content, tweet_id } = req.body;
        if (!(user_id && comment_content && tweet_id))
            throw new CustomError_1.default('Faltan campos por enviar', 400);
        yield (0, users_1.userExists)(user_id);
        (0, users_1.userIsAuth)(req, user_id);
        yield (0, tweets_1.tweetExists)(tweet_id);
        const createdComment = yield (0, comments_service_1.createCommentByTweetPk)(user_id, comment_content, tweet_id);
        res.status(201).json(createdComment);
    }
    catch (e) {
        next(e);
    }
});
exports.createCommentByTweet = createCommentByTweet;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { comment_content } = req.body;
        yield (0, comments_1.commentExists)(id);
        yield (0, posts_1.postBelongsToUser)(req, id);
        const updatedComment = yield (0, comments_service_1.updateCommentByPk)(id, comment_content);
        res.status(200).json(updatedComment);
    }
    catch (e) {
        next(e);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, comments_1.commentExists)(id);
        yield (0, posts_1.postBelongsToUser)(req, id);
        yield (0, comments_service_1.deleteCommentByPk)(id);
        res.status(200).end();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteComment = deleteComment;
