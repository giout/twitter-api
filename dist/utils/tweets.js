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
exports.tweetExists = void 0;
const tweets_service_1 = require("../services/tweets.service");
const CustomError_1 = __importDefault(require("./CustomError"));
const tweetExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield (0, tweets_service_1.findTweetByPk)(id);
    if (!tweet)
        throw new CustomError_1.default('El tweet no existe', 400);
    return tweet;
});
exports.tweetExists = tweetExists;
