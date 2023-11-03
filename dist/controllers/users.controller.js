"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFollowing = exports.getUserFollowers = exports.getUserFeed = exports.getUserTweets = exports.removeUser = exports.updateUser = exports.getUserByPk = exports.getAuthUser = exports.getAllUsers = void 0;
// parametros activos -> search
// paginacion
const getAllUsers = (req, res, next) => {
    try {
        // obtiene el parametro
        // verifica si existe
        // busca usuarios
        // en caso de existir el parametro, la busqueda se ejecuta con filtrado
        // devuelve resultados obtenidos
    }
    catch (e) {
        next(e);
    }
};
exports.getAllUsers = getAllUsers;
const getAuthUser = (req, res, next) => {
    try {
        // obtiene payload del token
        // obtiene id del usuario
        // busca en base de datos
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getAuthUser = getAuthUser;
const getUserByPk = (req, res, next) => {
    try {
        // obtiene id por parametro pasivo
        // busca en base de datos por id
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getUserByPk = getUserByPk;
const updateUser = (req, res, next) => {
    try {
        // obtiene id por parametro pasivo
        // obtiene body del request
        // actualiza en base de datos
    }
    catch (e) {
        next(e);
    }
};
exports.updateUser = updateUser;
const removeUser = (req, res, next) => {
    try {
        // obtiene id por parametro pasivo
        // elimina de base de datos    
    }
    catch (e) {
        next(e);
    }
};
exports.removeUser = removeUser;
// paginacion
const getUserTweets = (req, res, next) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getUserTweets = getUserTweets;
// paginacion
const getUserFeed = (req, res, next) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getUserFeed = getUserFeed;
// paginacion
const getUserFollowers = (req, res, next) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getUserFollowers = getUserFollowers;
// paginacion
const getUserFollowing = (req, res, next) => {
    try {
        // obtiene parametros activos
        // obtiene id por parametro pasivo
        // busca en base de datos
        // si los parametros activos existen, la busqueda se filtra
        // devuelve resultados
    }
    catch (e) {
        next(e);
    }
};
exports.getUserFollowing = getUserFollowing;
