const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/user/:id', userController.viewProfile);
router.get('/user/:id/dashboard', userController.viewFriendDashboard);

module.exports = router;
