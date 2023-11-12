"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authentication);
router.get('/', users_controller_1.getAllUsers);
router.get('/me', users_controller_1.getAuthUserId);
router.route('/:id')
    .get(users_controller_1.getUserById)
    .put(users_controller_1.updateUser)
    .delete(users_controller_1.removeUser);
router.get('/:id/tweets', users_controller_1.getUserTweets);
router.get('/:id/comments', users_controller_1.getUserComments);
router.get('/:id/followers', users_controller_1.getUserFollowers);
router.get('/:id/followings', users_controller_1.getUserFollowing);
exports.default = router;
