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
exports.handleFollow = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const users_1 = require("../utils/users");
const follows_service_1 = require("../services/follows.service");
const handleFollow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_follower, user_following } = req.body;
        if (!(user_follower && user_following))
            throw new CustomError_1.default('Data is missing.', 400);
        yield (0, users_1.userExists)(user_follower);
        yield (0, users_1.userExists)(user_following);
        // se comprueba que el usuario que quiere seguir sea el autenticado
        (0, users_1.userIsAuth)(req, user_follower);
        // si ya el post tiene like, se elimina, y si no existe, se crea
        const like = yield (0, follows_service_1.findFollow)(user_follower, user_following);
        if (like) {
            yield (0, follows_service_1.deleteFollow)(user_follower, user_following);
            return res.status(200).json({ msg: 'User unfollowed.' });
        }
        yield (0, follows_service_1.createFollow)(user_follower, user_following);
        res.status(201).json({ msg: 'User followed.' });
    }
    catch (e) {
        next(e);
    }
});
exports.handleFollow = handleFollow;
