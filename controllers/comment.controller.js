const commentDB = require('../models/comment.model');
const albumDB = require('../models/album.model');
const notificationDB = require('../models/notification.model');
const { sendNotification } = require('../config/socket.config');

exports.addComment = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user.id_usuario;
  const imageId = parseInt(req.body.imageId, 10);
  const texto = req.body.texto && req.body.texto.trim();

  if (!imageId || isNaN(imageId)) {
    return res.status(400).send('El ID de imagen es inválido.');
  }
  if (!texto || texto.length === 0) {
    return res.status(400).send('El comentario no puede estar vacío.');
  }

  commentDB.addComment(imageId, userId, texto, (err) => {
    if (err) {
      console.error('❌ Error al guardar comentario:', err.message);
      return res.status(500).send('Error al dejar comentario.');
    }

    albumDB.getImageById(imageId, (err, image) => {
      if (err || !image) {
        console.error('❌ Error al obtener imagen:', err ? err.message : 'Imagen no encontrada');
        return res.status(500).send('Error al cargar imagen.');
      }

      const ownerId = image.usuario_id;
      const message = `${req.session.user.nombre} comentó tu foto "${image.titulo || 'sin título'}"`;
      const target_url = `/image/${image.id_imagen}`;

      notificationDB.createNotification(ownerId, 'comentario', message, target_url, (err) => {
        if (err) {
          console.error('❌ Error al crear notificación:', err.message);
        }
        sendNotification(ownerId, message);
        res.redirect(`/image/${imageId}`);
      });
    });
  });
};
