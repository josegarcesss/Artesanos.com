const commentDB = require('../models/comment.model');

exports.addComment = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('No estás autorizado para comentar.');
    }

    const userId = req.session.user.id_usuario;
    const { imageId, text } = req.body;

    if (!text || !imageId) {
        return res.status(400).send('Faltan campos: texto o ID de imagen.');
    }

    commentDB.addComment(imageId, userId, text, (err) => {
        if (err) {
            console.error('Error al enviar comentario:', err.message);
            return res.status(500).send('Error al enviar comentario.');
        }
        res.redirect(`/image/${imageId}`);
    });
};
