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
exports.userIsAuth = exports.userExists = void 0;
const users_service_1 = require("../services/users.service");
const CustomError_1 = __importDefault(require("./CustomError"));
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_service_1.findUserByPk)(id);
    if (!user)
        throw new CustomError_1.default('User does not exist.', 404);
    return user;
});
exports.userExists = userExists;
// verifica si el id del usuario autenticado es igual al id ingresado
const userIsAuth = (req, id) => {
    const { user } = req;
    if (user.id != id)
        throw new CustomError_1.default('It is not allowed to create, update or delete data of a user that is not authenticated.', 401);
};
exports.userIsAuth = userIsAuth;
