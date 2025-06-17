const db = require('./db');

exports.addComment = (imageId, userId, text, callback) => {
    db.query(
        'INSERT INTO Comentarios (imagen_id, usuario_id, texto) VALUES (?, ?, ?)',
        [imageId, userId, text],
        callback
    );
};

exports.getCommentsByImage = (imageId, callback) => {
    db.query(
        `SELECT c.*, u.nombre 
         FROM Comentarios c
         JOIN Usuarios u ON c.usuario_id = u.id_usuario
         WHERE c.imagen_id = ?`,
        [imageId],
        callback
    );
};