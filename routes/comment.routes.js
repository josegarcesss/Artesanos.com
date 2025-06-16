const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/comment', commentController.addComment);

module.exports = router;