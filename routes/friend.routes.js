const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller');

router.get('/users', friendController.viewUsers);
router.post('/add', friendController.addFriend);
router.get('/friends', friendController.viewFriends);
router.get('/requests', friendController.viewRequests);
router.post('/accept', friendController.acceptFriend);
router.post('/reject', friendController.rejectFriend);

module.exports = router;