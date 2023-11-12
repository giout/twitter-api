import { Router } from "express"
import { getAllUsers, getAuthUserId, getUserById, getUserFollowers, getUserTweets, removeUser, updateUser, getUserFollowing, getUserComments } from '../controllers/users.controller'
import { authentication } from "../middlewares/auth"

const router = Router()

router.use(authentication)

router.get('/', getAllUsers)

router.get('/me', getAuthUserId)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser)
    
router.get('/:id/tweets', getUserTweets)

router.get('/:id/comments', getUserComments)

router.get('/:id/followers', getUserFollowers)

router.get('/:id/followings', getUserFollowing)

export default router