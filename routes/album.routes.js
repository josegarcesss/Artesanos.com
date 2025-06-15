const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const albumController = require('../controllers/album.controller');

router.get('/upload', albumController.viewUploadForm); // Formulario de carga
router.post('/upload', upload.single('imagen'), albumController.uploadImage); // Subida de imagen
router.get('/images', albumController.listImages); // Ver todas las imágenes públicas
router.get('/image/:id', albumController.viewImageDetail); // Detalle de imagen

module.exports = router;