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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
// clase para simplificar las conexiones a base de datos
class DataPool {
    constructor(uri) {
        this.execute = (sentence, args = []) => __awaiter(this, void 0, void 0, function* () {
            const op = yield this.pool.query(sentence, args); // realiza la operacion
            yield this.pool.end(); // finaliza la conexion a bd
            return op;
        });
        this.pool = new pg_1.Pool({ connectionString: uri });
    }
}
const pool = new DataPool(process.env.DB_URI);
exports.default = pool;
