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
exports.setLikes = exports.postBelongsToUser = exports.postExists = void 0;
const posts_service_1 = require("../services/posts.service");
const CustomError_1 = __importDefault(require("./CustomError"));
const users_1 = require("./users");
const likes_service_1 = require("../services/likes.service");
// los tweets y comentarios pertenecen a la misma entidad (posts), y en algunos escenarios seran tratados por igual
const postExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, posts_service_1.findPostByPk)(id);
    if (!post)
        throw new CustomError_1.default('Post does not exist.', 404);
});
exports.postExists = postExists;
// verifica si el post pertenence al usuario que esta autenticado en la api
const postBelongsToUser = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, posts_service_1.findPostByPk)(id);
    const userId = post.user_id;
    (0, users_1.userIsAuth)(req, userId);
});
exports.postBelongsToUser = postBelongsToUser;
// determina si el usuario le ha dado like a los posts ingresados
const setLikes = (req, posts) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    for (let i = 0; i < posts.length; i++) {
        let like = yield (0, likes_service_1.findLike)(user.id, posts[i].post_id);
        // se agrega la nueva propiedad
        posts[i].liked = like != undefined;
    }
});
exports.setLikes = setLikes;
