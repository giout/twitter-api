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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFollowing = exports.getUserFollowers = exports.getUserTweets = exports.removeUser = exports.updateUser = exports.getUserById = exports.getAuthUserId = exports.getAllUsers = void 0;
const users_service_1 = require("../services/users.service");
const bcrypt_1 = require("../utils/bcrypt");
const tweets_service_1 = require("../services/tweets.service");
const users_1 = require("../utils/users");
const users_service_2 = require("../services/users.service");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let search, offset, limit;
        // filtrado
        search = req.query.search || '';
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        const users = yield (0, users_service_1.findUsers)(search, offset, limit);
        res.status(200).json(users);
    }
    catch (e) {
        next(e);
    }
});
exports.getAllUsers = getAllUsers;
const getAuthUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // obtiene payload del token
        const { user } = req;
        res.status(200).json({ user_id: user.id });
    }
    catch (e) {
        next(e);
    }
});
exports.getAuthUserId = getAuthUserId;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, users_1.userExists)(id);
        res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, users_1.userExists)(id);
        (0, users_1.userIsAuth)(req, id);
        const { password } = req.body;
        if (password)
            req.body.password = (0, bcrypt_1.encrypt)(password);
        const updatedUser = yield (0, users_service_1.updateUserByPk)(id, req.body);
        res.status(200).json(updatedUser);
    }
    catch (e) {
        next(e);
    }
});
exports.updateUser = updateUser;
const removeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        (0, users_1.userExists)(id);
        (0, users_1.userIsAuth)(req, id);
        yield (0, users_service_1.deleteUser)(id);
        res.status(200).end();
    }
    catch (e) {
        next(e);
    }
});
exports.removeUser = removeUser;
// filtrado
const getUserTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let order, offset, limit;
        // ordenamiento
        order = req.query.order || '';
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        yield (0, users_1.userExists)(id);
        const tweets = yield (0, tweets_service_1.findTweetsByUser)(id, order, offset, limit);
        res.status(200).json(tweets);
    }
    catch (e) {
        next(e);
    }
});
exports.getUserTweets = getUserTweets;
const getUserFollowers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let search, offset, limit;
        // filtrado
        search = req.query.search || '';
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        yield (0, users_1.userExists)(id);
        const followers = yield (0, users_service_2.findFollowersByPk)(id, search, offset, limit);
        res.status(200).json(followers);
    }
    catch (e) {
        next(e);
    }
});
exports.getUserFollowers = getUserFollowers;
const getUserFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let search, offset, limit;
        // filtrado
        search = req.query.search || '';
        // paginacion
        offset = req.query.offset || null;
        limit = req.query.limit || null;
        yield (0, users_1.userExists)(id);
        const followings = yield (0, users_service_2.findFollowingsByPk)(id, search, offset, limit);
        res.status(200).json(followings);
    }
    catch (e) {
        next(e);
    }
});
exports.getUserFollowing = getUserFollowing;
