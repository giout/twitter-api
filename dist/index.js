"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./config/app"));
const init_1 = require("./db/init");
const port = process.env.PORT || 4000;
(0, init_1.dbInit)().then(() => console.log('DB setup completed'));
app_1.default.listen(port, () => { console.log('Listening on port', port); });
