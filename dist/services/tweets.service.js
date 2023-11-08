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
exports.findAllTweets = exports.deleteTweetByPk = exports.updateTweetByPk = exports.createTweetByUser = exports.findTweetByPk = exports.findTweetsByUser = void 0;
const database_1 = __importDefault(require("../config/database"));
const tweets_query_1 = __importDefault(require("./queries/tweets.query"));
const findTweetsByUser = (userId, order, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // por defecto, los tweets se ordenan por mas reciente
    let sentence = tweets_query_1.default.selectAllBy.user.new;
    if (order === 'popular')
        sentence = tweets_query_1.default.selectAllBy.user.popular;
    if (order === 'old')
        sentence = tweets_query_1.default.selectAllBy.user.oldest;
    if (order === 'lesspopular')
        sentence = tweets_query_1.default.selectAllBy.user.lessPopular;
    const tweets = yield database_1.default.query(sentence, [userId, offset, limit]);
    return tweets.rows;
});
exports.findTweetsByUser = findTweetsByUser;
const findTweetByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = tweets_query_1.default.selectAllBy.pk;
    const tweets = yield database_1.default.query(sentence, [id]);
    if (tweets.rows[0])
        return tweets.rows[0];
    return;
});
exports.findTweetByPk = findTweetByPk;
const createTweetByUser = (userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield database_1.default.query(tweets_query_1.default.insert, [userId, content]);
    return tweet.rows[0];
});
exports.createTweetByUser = createTweetByUser;
const updateTweetByPk = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    if (content)
        yield database_1.default.query(tweets_query_1.default.update.content, [content, id]);
    return (0, exports.findTweetByPk)(id);
});
exports.updateTweetByPk = updateTweetByPk;
const deleteTweetByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(tweets_query_1.default.delete, [id]);
});
exports.deleteTweetByPk = deleteTweetByPk;
const findAllTweets = (order, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // por defecto, los tweets se ordenan por mas reciente
    let sentence = tweets_query_1.default.selectAll.new;
    if (order === 'popular')
        sentence = tweets_query_1.default.selectAll.popular;
    if (order === 'old')
        sentence = tweets_query_1.default.selectAll.oldest;
    if (order === 'lesspopular')
        sentence = tweets_query_1.default.selectAll.lessPopular;
    const tweets = yield database_1.default.query(sentence, [offset, limit]);
    return tweets.rows;
});
exports.findAllTweets = findAllTweets;
