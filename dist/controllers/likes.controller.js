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
exports.handleLike = void 0;
const posts_1 = require("../utils/posts");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const likes_service_1 = require("../services/likes.service");
const handleLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, post_id } = req.body;
        if (!(user_id && post_id))
            throw new CustomError_1.default('Faltan campos por enviar', 400);
        yield (0, posts_1.postExists)(post_id);
        // si ya el post tiene like, se elimina, y si no existe, se crea
        const like = yield (0, likes_service_1.findLike)(user_id, post_id);
        if (like) {
            yield (0, likes_service_1.deleteLike)(user_id, post_id);
            return res.status(200).json({ msg: 'Se ha eliminado el like de la publicacion' });
        }
        yield (0, likes_service_1.createLike)(user_id, post_id);
        res.status(201).json({ msg: 'Se ha agregado un like a la publicacion' });
    }
    catch (e) {
        next(e);
    }
});
exports.handleLike = handleLike;
