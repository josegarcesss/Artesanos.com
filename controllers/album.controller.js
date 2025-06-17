const path = require('path');
const fs = require('fs');
const upload = require('../config/multer.config');
const albumDB = require('../models/album.model');
const commentDB = require('../models/comment.model');

exports.viewUploadForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  albumDB.getAlbumsByUser(req.session.user.id_usuario, (err, albums) => {
    if (err) {
      return res.status(500).send('Error al obtener álbumes. Por favor, intenta más tarde.');
    }

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
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const userId = req.session.user.id_usuario;
  const { album, newAlbumTitle } = req.body;
  const visibilidad = req.body.visibilidad || 'publica';
  const imagePath = `/uploads/${req.file.filename}`;
  const title = req.body.title || '';
  const description = req.body.description || '';

  if (!album || (album !== 'new' && isNaN(album))) {
    return res.status(400).render('upload', {
      user: req.session.user,
      albums: [],
      message: 'Debes seleccionar un álbum válido.',
      error: 'Elige un álbum antes de continuar'
    });
  }

  let finalAlbumId = album;

  function _uploadImage(albumId) {
    albumDB.getImageCountByAlbum(albumId, (err, count) => {
      if (err) {
        console.error('❌ Error al contar imágenes:', err.message);
        return res.status(500).send('Error al comprobar imágenes.');
      }
      if (count >= 20) {
        return res.status(400).render('upload', {
          user: req.session.user,
          albums: [],
          message: 'El álbum ya tiene el máximo de 20 imágenes.'
        });
      }
      albumDB.uploadImage(albumId, imagePath, title, description, visibilidad, (err) => {
        if (err) {
          console.error('❌ Error al subir imagen:', err.message);
          return res.status(500).send('Error al subir imagen.');
        }
        res.redirect('/images');
      });
    });
  }

  if (album === 'new') {
    if (!newAlbumTitle) {
      return res.status(400).render('upload', {
        user: req.session.user,
        albums: [],
        message: 'Debes proporcionar un título para el nuevo álbum.',
        error: 'El título del álbum no puede estar vacío.'
      });
    }

    albumDB.createAlbum(userId, newAlbumTitle, (err, result) => {
      if (err) {
        console.error('❌ Error al crear álbum:', err.message);
        return res.status(500).send('Error al crear álbum');
      }
      finalAlbumId = result.insertId;
      _uploadImage(finalAlbumId);
    });
  } else {
    _uploadImage(finalAlbumId);
  }
};

exports.deleteAlbum = function(req, res) {
    const albumId = req.body.albumId;
    albumDB.deleteAlbum(albumId, function(err) {
        if (err) return res.status(500).send('Error al borrar álbum');
        res.redirect('/upload');
    });
};

exports.deleteImage = function(req, res) {
    const imageId = req.body.imageId;
    const userId = req.session.user.id_usuario;

    albumDB.getImageById(imageId, function(err, results) {
        if (err) return res.status(500).send('Error al obtener imagen');

        const image = results[0];
        if (!image) return res.status(404).send('Imagen no encontrada');

        albumDB.getAlbumById(image.album_id, function(err, album) {
            if (err) return res.status(500).send('Error al obtener álbum');
            if (album.usuario_id !== userId) {
                return res.status(403).send('No tienes permiso para borrar esta imagen.');
            }

            albumDB.deleteImage(imageId, function(err) {
                if (err) return res.status(500).send('Error al borrar imagen');
                res.redirect('back');
            });
        });
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

            console.log('Comentarios cargados:', comments); 

            res.render('image-detail', {
                user: req.session.user,
                image: image,
                comments: comments || []
            });
        });
    });
};

exports.listImages = (req, res) => {
  const currentUserId = req.session.user ? req.session.user.id_usuario : null;
  
  albumDB.getVisibleImages(currentUserId, (err, images) => {
    if (err) {
      console.error('❌ Error al cargar imágenes:', err.message);
      return res.status(500).send('Error al cargar imágenes.');
    }
    res.render('images', { user: req.session.user, images });
  });
};
