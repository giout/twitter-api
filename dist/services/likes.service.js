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
exports.deleteLike = exports.createLike = exports.findLike = void 0;
const database_1 = __importDefault(require("../config/database"));
const likes_query_1 = __importDefault(require("./queries/likes.query"));
const findLike = (user_id, post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const likes = yield database_1.default.query(likes_query_1.default.selectAllBy.userAndPost, [post_id, user_id]);
    if (likes.rows[0])
        return likes.rows[0];
    return;
});
exports.findLike = findLike;
const createLike = (user_id, post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const entry = yield database_1.default.query(likes_query_1.default.insert, [post_id, user_id]);
    return entry;
});
exports.createLike = createLike;
const deleteLike = (user_id, post_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query(likes_query_1.default.delete, [post_id, user_id]);
});
exports.deleteLike = deleteLike;
