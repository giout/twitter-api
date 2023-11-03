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
exports.createUser = exports.findUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const findUsers = (search = '') => __awaiter(void 0, void 0, void 0, function* () {
    let query = `SELECT * FROM users WHERE alias LIKE '${search}%' OR first_name LIKE '${search}%' OR last_name LIKE '${search}%'`;
    const users = yield database_1.default.execute(query);
    return users.rows;
});
exports.findUsers = findUsers;
const createUser = (alias, firstName, lastName, biography) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO users (alias, first_name, last_name, biography) VALUES ($1, $2, $3, $4)`;
    const params = [alias, firstName, lastName, biography];
    yield database_1.default.execute(query, params);
});
exports.createUser = createUser;
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    //await createUser('giout','Giovanni', 'Urdaneta', 'a')
    const a = yield (0, exports.findUsers)('ju');
    console.log(a);
});
test();
