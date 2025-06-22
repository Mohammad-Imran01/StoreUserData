const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserId,
    addUser,
    updateUser,
    removeUser
} = require('../controller/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserId);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = router;
