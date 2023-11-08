"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// rutas desprotegidas
router.post('/login', auth_controller_1.logIn);
router.post('/signup', auth_controller_1.signUp);
exports.default = router;
