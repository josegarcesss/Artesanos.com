const path = require('path');
const fs = require('fs');
const upload = require('../config/multer.config');
const albumDB = require('../models/album.model');
const commentDB = require('../models/comment.model');

exports.viewUploadForm = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    albumDB.getAlbumsByUser(req.session.user.id_usuario, (err, albums) => {
        if (err) return res.status(500).send('Error al obtener álbumes.');

        if (albums.length === 0) {
            return res.render('upload', {
                user: req.session.user,
                albums: [],
                message: 'No tienes álbumes. Crea uno desde tu perfil.'
            });
        }

        res.render('upload', { user: req.session.user, albums });
    });
};

exports.uploadImage = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const albumId = req.body.album;
    const title = req.body.title || '';
    const description = req.body.description || '';

    if (!albumId || isNaN(albumId)) {
        return res.status(400).render('upload', {
            user: req.session.user,
            albums: [],
            message: 'Debes seleccionar un álbum válido.',
            error: 'Elige un álbum antes de continuar'
        });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    albumDB.uploadImage(albumId, imagePath, title, description, (err) => {
        if (err) {
            console.error('❌ Error al subir imagen:', err.message);
            return res.status(500).send('Error al subir imagen.');
        }

        res.redirect('/images');
    });
};

exports.listImages = (req, res) => {
    albumDB.getAllImages((err, images) => {
        if (err) return res.status(500).send('Error al cargar imágenes.');
        res.render('images', { user: req.session.user, images });
    });
};

exports.viewImageDetail = (req, res) => {
    const imageId = req.params.id;

    albumDB.getImageById(imageId, (err, image) => {
        if (err) return res.status(500).send('Error al cargar imagen.');

        commentDB.getCommentsByImage(imageId, (err, comments) => {
            if (err) return res.status(500).send('Error al cargar comentarios.');
            
            res.render('image-detail', {
                user: req.session.user,
                image: image,
                comments: comments || []
            });
        });
    });
};