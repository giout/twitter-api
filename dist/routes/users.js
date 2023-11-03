"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
// obtener usuarios
// parametros activos -> filter (representa username o first-name o last-name)
// paginacion
// GET users
router.get('/', users_controller_1.getAllUsers);
// obtener usuario validado por JWT
// GET users/me
router.get('/me', users_controller_1.getAuthUser);
// obtener usuario por pk
//  GET users/:id
// actualizar usuario
// PUT users/:id
// eliminar usuario
// DELETE users/:id
router.route('/:id')
    .get(users_controller_1.getUserByPk)
    .put(users_controller_1.updateUser)
    .delete(users_controller_1.removeUser);
// obtener tweets de usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/tweets
router.get('/:id/tweets', users_controller_1.getUserTweets);
// obtener feed de un usuario
// parametros activos -> popularity, oldest
// paginacion
// GET users/:id/feed
router.get('/:id/feed', users_controller_1.getUserFeed);
// obtener seguidores de un usuario
// paginacion
// GET users/:id/followers
router.get('/:id/followers', users_controller_1.getUserFollowers);
// obtener seguidos de un usuario
// paginacion
// GET users/:id/following
router.get('/:id/following', users_controller_1.getUserFollowing);
exports.default = router;
