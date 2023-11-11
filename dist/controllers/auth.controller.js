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
exports.logIn = exports.signUp = void 0;
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const validation_1 = require("../utils/validation");
const bcrypt_1 = require("../utils/bcrypt");
const users_service_1 = require("../services/users.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { alias, first_name, last_name, biography, password } = req.body;
        const user = yield (0, users_service_1.findUserByAlias)(alias);
        if (user)
            throw new CustomError_1.default('User already exists.', 400);
        // validacion de campos vacios
        if (!(alias && first_name && last_name && biography && password))
            throw new CustomError_1.default('Data is missing.', 400);
        // validacion de clave
        if (!(0, validation_1.validatePassword)(password))
            throw new CustomError_1.default('Password must contain at least 8 characters, letters and numbers.', 400);
        password = (0, bcrypt_1.encrypt)(password); // encriptacion de clave
        const createdUser = yield (0, users_service_1.createUser)(alias, first_name, last_name, biography, password);
        res.status(201).json(createdUser);
    }
    catch (e) {
        next(e);
    }
});
exports.signUp = signUp;
const logIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { alias, password } = req.body;
        // verificar si usuario existe
        const user = yield (0, users_service_1.findUserByAlias)(alias);
        if (!user)
            throw new CustomError_1.default('User does not exist.', 400);
        // verificar si la clave concuerda
        const equals = (0, bcrypt_1.compareCrypted)(password, user.password);
        if (!equals)
            throw new CustomError_1.default('Password is invalid.', 400);
        // crear y enviar token de autenticacion    
        const signature = process.env.TOKEN_SIGNATURE;
        const payload = { id: user.user_id }; // datos que contendra el token
        const token = jsonwebtoken_1.default.sign(payload, signature, {
            expiresIn: 60 * 60 * 24 * 30 // 1 mes
        });
        res.status(200).json({ token });
    }
    catch (e) {
        next(e);
    }
});
exports.logIn = logIn;
// username -> andreita3
// clave -> 1234595049540a
