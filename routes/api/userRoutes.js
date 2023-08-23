const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    removeUser,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(removeUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;