const db = require('./db');

exports.createAlbum = (userId, title, callback) => {
    const sql = 'INSERT INTO Albumes (usuario_id, titulo) VALUES (?, ?)';
    db.query(sql, [userId, title], callback);
};

exports.getAlbumsByUser = (userId, callback) => {
    const sql = 'SELECT * FROM Albumes WHERE usuario_id = ?';
    db.query(sql, [userId], callback);
};

exports.uploadImage = (albumId, imagePath, title, description, callback) => {
    const sql = 'INSERT INTO Imagenes (album_id, url_imagen, titulo, descripcion) VALUES (?, ?, ?, ?)';
    db.query(sql, [albumId, imagePath, title || null, description || null], callback);
};

exports.getAllImages = (callback) => {
    const sql = `
        SELECT i.id_imagen, i.titulo, i.url_imagen, u.nombre AS autor 
        FROM Imagenes i
        JOIN Albumes a ON i.album_id = a.id_album
        JOIN Usuarios u ON a.usuario_id = u.id_usuario
        WHERE i.visibilidad = 'publica'
    `;
    db.query(sql, [], callback);
};

exports.getImageById = (imageId, callback) => {
    const sql = `
        SELECT i.*, u.nombre AS autor 
        FROM Imagenes i
        JOIN Albumes a ON i.album_id = a.id_album
        JOIN Usuarios u ON a.usuario_id = u.id_usuario
        WHERE i.id_imagen = ?
    `;
    db.query(sql, [imageId], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};