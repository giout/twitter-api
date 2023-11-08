"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    if (regex.test(password))
        return true;
    return false;
};
exports.validatePassword = validatePassword;
