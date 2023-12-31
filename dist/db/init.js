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
exports.dbInit = void 0;
const database_1 = __importDefault(require("../config/database"));
const query = `
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    alias VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    followers_count INTEGER NOT NULL DEFAULT 0,
    biography TEXT NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS followers (
    user_follower INTEGER NOT NULL,
    user_following INTEGER NOT NULL,
    PRIMARY KEY(user_follower, user_following),
    FOREIGN KEY (user_follower) REFERENCES users (user_id),
    FOREIGN KEY (user_following) REFERENCES users (user_id),
    CHECK (user_follower <> user_following)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL,
    user_id INTEGER NOT NULL,
    tweet_content TEXT NOT NULL,
    tweet_likes INTEGER NOT NULL DEFAULT 0,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    comment_to INTEGER,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (comment_to) REFERENCES posts (post_id),
    CHECK (post_id <> comment_to)
);

CREATE TABLE IF NOT EXISTS likes (
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);`;
// crea todas las tablas y triggers de la base de datos (si no han sido creadas previamente)
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.execute(query);
    }
    catch (_a) {
        process.exit(1);
    }
});
exports.dbInit = dbInit;
