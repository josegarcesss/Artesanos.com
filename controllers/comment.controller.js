const commentDB = require('../models/comment.model');

exports.addComment = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const userId = req.session.user.id_usuario;
    const imageId = parseInt(req.body.imageId);
    const texto = req.body.texto;

    commentDB.addComment(imageId, userId, texto, (err) => {
        if (err) return res.status(500).send('Error al enviar comentario.');
        res.redirect(`/image/${imageId}`);
    });
};