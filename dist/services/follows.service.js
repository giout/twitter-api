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
exports.deleteFollow = exports.createFollow = exports.findFollow = void 0;
const database_1 = __importDefault(require("../config/database"));
const follows_query_1 = __importDefault(require("./queries/follows.query"));
const findFollow = (user_follower, user_following) => __awaiter(void 0, void 0, void 0, function* () {
    const likes = yield database_1.default.query(follows_query_1.default.selectAllBy.followerAndFollowing, [user_follower, user_following]);
    if (likes.rows[0])
        return likes.rows[0];
    return;
});
exports.findFollow = findFollow;
const createFollow = (user_follower, user_following) => __awaiter(void 0, void 0, void 0, function* () {
    const entry = yield database_1.default.query(follows_query_1.default.insert, [user_follower, user_following]);
    return entry;
});
exports.createFollow = createFollow;
const deleteFollow = (user_follower, user_following) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(follows_query_1.default.delete, [user_follower, user_following]);
});
exports.deleteFollow = deleteFollow;
