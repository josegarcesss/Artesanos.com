const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const albumController = require('../controllers/album.controller');
const commentController = require('../controllers/comment.controller');

router.post('/comment', commentController.addComment);
router.get('/upload', albumController.viewUploadForm);
router.post('/upload', upload.single('imagen'), albumController.uploadImage);
router.get('/images', albumController.listImages);
router.get('/image/:id', albumController.viewImageDetail);
router.post('/album/delete', albumController.deleteAlbum);
router.post('/image/delete', albumController.deleteImage);
module.exports = router;