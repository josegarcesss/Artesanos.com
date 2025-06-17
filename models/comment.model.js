const db = require('./db');

exports.addComment = (imageId, userId, text, callback) => {
    const sql = 'INSERT INTO Comentarios (imagen_id, usuario_id, texto) VALUES (?, ?, ?)';
    db.query(sql, [imageId, userId, text], callback);
};

exports.getCommentsByImage = (imageId, callback) => {
    const sql = `
        SELECT c.*, u.nombre AS autor 
        FROM Comentarios c
        JOIN Usuarios u ON c.usuario_id = u.id_usuario
        WHERE c.imagen_id = ?
    `;
    db.query(sql, [imageId], callback);
};