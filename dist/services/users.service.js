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
exports.findFollowingsByPk = exports.findFollowersByPk = exports.updateUserByPk = exports.deleteUser = exports.createUser = exports.findUserByPk = exports.findUserByAlias = exports.findUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const users_query_1 = __importDefault(require("../queries/users.query"));
const findUsers = (search, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    let sentence = users_query_1.default.selectAllBy.aliasOrName;
    const users = yield database_1.default.query(sentence, [search, offset, limit]);
    return users.rows;
});
exports.findUsers = findUsers;
const findUserByAlias = (alias) => __awaiter(void 0, void 0, void 0, function* () {
    let sentence = users_query_1.default.selectAllBy.alias;
    const user = yield database_1.default.query(sentence, [alias]);
    if (user.rows[0])
        return user.rows[0];
    return;
});
exports.findUserByAlias = findUserByAlias;
const findUserByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let sentence = users_query_1.default.selectAllBy.pk;
    const user = yield database_1.default.query(sentence, [id]);
    if (user.rows[0])
        return user.rows[0];
    return;
});
exports.findUserByPk = findUserByPk;
const createUser = (alias, firstName, lastName, biography, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.insert;
    const params = [alias, firstName, lastName, biography, password];
    const user = yield database_1.default.query(sentence, params);
    return user.rows[0];
});
exports.createUser = createUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.delete;
    yield database_1.default.query(sentence, [id]);
});
exports.deleteUser = deleteUser;
const updateUserByPk = (id, entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { alias, first_name, last_name, password, biography } = entry;
    if (alias)
        yield database_1.default.query(users_query_1.default.update.alias, [alias, id]);
    if (first_name)
        yield database_1.default.query(users_query_1.default.update.first_name, [first_name, id]);
    if (last_name)
        yield database_1.default.query(users_query_1.default.update.last_name, [last_name, id]);
    if (biography)
        yield database_1.default.query(users_query_1.default.update.biography, [biography, id]);
    if (password)
        yield database_1.default.query(users_query_1.default.update.password, [password, id]);
    return (0, exports.findUserByPk)(id);
});
exports.updateUserByPk = updateUserByPk;
const findFollowersByPk = (user_following, search, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield database_1.default.query(users_query_1.default.selectFollowers, [user_following, search, offset, limit]);
    return followers.rows;
});
exports.findFollowersByPk = findFollowersByPk;
const findFollowingsByPk = (user_follower, search, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const followings = yield database_1.default.query(users_query_1.default.selectFollowings, [user_follower, search, offset, limit]);
    return followings.rows;
});
exports.findFollowingsByPk = findFollowingsByPk;
