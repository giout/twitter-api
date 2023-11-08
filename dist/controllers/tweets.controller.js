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
exports.getFeed = exports.getCommentsByTweet = exports.removeTweet = exports.updateTweet = exports.getTweetById = exports.createTweet = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const users_1 = require("../utils/users");
const tweets_service_1 = require("../services/tweets.service");
const tweets_1 = require("../utils/tweets");
const posts_1 = require("../utils/posts");
const comments_service_1 = require("../services/comments.service");
const createTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, tweet_content } = req.body;
        if (!(user_id && tweet_content))
            throw new CustomError_1.default('Faltan campos por llenar', 400);
        yield (0, users_1.userExists)(user_id);
        (0, users_1.userIsAuth)(req, user_id);
        const createdTweet = yield (0, tweets_service_1.createTweetByUser)(user_id, tweet_content);
        res.status(201).json(createdTweet);
    }
    catch (e) {
        next(e);
    }
});
exports.createTweet = createTweet;
const getTweetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tweet = yield (0, tweets_1.tweetExists)(id);
        res.status(200).json(tweet);
    }
    catch (e) {
        next(e);
    }
});
exports.getTweetById = getTweetById;
const updateTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, tweets_1.tweetExists)(id);
        yield (0, posts_1.postBelongsToUser)(req, id);
        const { tweet_content } = req.body;
        const updatedTweet = yield (0, tweets_service_1.updateTweetByPk)(id, tweet_content);
        res.status(200).json(updatedTweet);
    }
    catch (e) {
        next(e);
    }
});
exports.updateTweet = updateTweet;
const removeTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, tweets_1.tweetExists)(id);
        yield (0, posts_1.postBelongsToUser)(req, id);
        yield (0, tweets_service_1.deleteTweetByPk)(id);
        res.status(200).end();
    }
    catch (e) {
        next(e);
    }
});
exports.removeTweet = removeTweet;
const getCommentsByTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let offset, limit;
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        yield (0, tweets_1.tweetExists)(id);
        const comments = yield (0, comments_service_1.findCommentsByTweet)(id, offset, limit);
        res.status(200).json(comments);
    }
    catch (e) {
        next(e);
    }
});
exports.getCommentsByTweet = getCommentsByTweet;
const getFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let order, offset, limit;
        // ordenamiento
        order = req.query.order || '';
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        const tweets = yield (0, tweets_service_1.findAllTweets)(order, offset, limit);
        res.status(200).json(tweets);
    }
    catch (e) {
        next(e);
    }
});
exports.getFeed = getFeed;
