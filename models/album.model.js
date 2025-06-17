const db = require('./db');

exports.createAlbum = (userId, title, callback) => {
    const sql = 'INSERT INTO Albumes (usuario_id, titulo) VALUES (?, ?)';
    db.query(sql, [userId, title], callback);
};

exports.getAlbumsByUser = (userId, callback) => {
  const sql = 'SELECT * FROM albumes WHERE usuario_id = ?';
  console.log("Ejecutando query:", sql, [userId]); 
  db.query(sql, [userId], callback);
};



exports.getAlbumById = function(albumId, callback) {
    db.query(
        'SELECT * FROM Albumes WHERE id_album = ?',
        [albumId],
        function(err, results) {
            if (err) return callback(err);
            callback(null, results[0]);
        }
    );
};

exports.getVisibleImagesByAlbum = (albumId, viewerId, callback) => {
  let sql = '';
  let params = [];
  if (viewerId) {
    sql = `
      SELECT i.id_imagen, i.titulo, i.url_imagen, i.visibilidad, u.nombre AS autor
      FROM Imagenes i
      JOIN Albumes a ON i.album_id = a.id_album
      JOIN Usuarios u ON a.usuario_id = u.id_usuario
      WHERE a.id_album = ? AND (
        i.visibilidad = 'publica'
        OR (i.visibilidad = 'amigos' AND (a.usuario_id = ? 
            OR a.usuario_id IN (
              SELECT CASE WHEN usuario_id = ? THEN amigo_id ELSE usuario_id END AS friendId
              FROM amistades
              WHERE (usuario_id = ? OR amigo_id = ?) AND estado = 'aceptado'
            )
        ))
      )
    `;
    params = [albumId, viewerId, viewerId, viewerId, viewerId];
  } else {
    sql = `
      SELECT i.id_imagen, i.titulo, i.url_imagen, i.visibilidad, u.nombre AS autor
      FROM Imagenes i
      JOIN Albumes a ON i.album_id = a.id_album
      JOIN Usuarios u ON a.usuario_id = u.id_usuario
      WHERE a.id_album = ? AND i.visibilidad = 'publica'
    `;
    params = [albumId];
  }
  db.query(sql, params, callback);
};




exports.getImageCountByAlbum = (albumId, callback) => {
  const sql = 'SELECT COUNT(*) AS count FROM Imagenes WHERE album_id = ?';
  db.query(sql, [albumId], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count);
  });
};

exports.uploadImage = (albumId, imagePath, title, description, visibilidad, callback) => {
  const sql = 'INSERT INTO Imagenes (album_id, url_imagen, titulo, descripcion, visibilidad) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [albumId, imagePath, title || null, description || null, visibilidad], callback);
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

exports.deleteAlbum = function(albumId, callback) {
    db.query(
        'DELETE FROM Albumes WHERE id_album = ?',
        [albumId],
        callback
    );
};

exports.deleteImage = function(imageId, callback) {
    db.query(
        'DELETE FROM Imagenes WHERE id_imagen = ?',
        [imageId],
        callback
    );
};

exports.getVisibleImages = (userId, callback) => {
  let sql = "";
  let params = [];
  
  if (userId) {
    sql = `
      SELECT i.id_imagen, i.titulo, i.url_imagen, u.nombre AS autor, a.usuario_id AS autor_id, i.visibilidad
      FROM Imagenes i
      JOIN Albumes a ON i.album_id = a.id_album
      JOIN Usuarios u ON a.usuario_id = u.id_usuario
      WHERE i.visibilidad = 'publica'
         OR (i.visibilidad = 'amigos'
             AND ( a.usuario_id = ? 
                   OR a.usuario_id IN (
                        SELECT CASE 
                                WHEN f.usuario_id = ? THEN f.amigo_id 
                                ELSE f.usuario_id 
                              END AS friend_id
                        FROM amistades f
                        WHERE (f.usuario_id = ? OR f.amigo_id = ?) AND f.estado = 'aceptado'
                   )
             )
         )
    `;
    params = [userId, userId, userId, userId];
  } else {
    sql = `
      SELECT i.id_imagen, i.titulo, i.url_imagen, u.nombre AS autor, a.usuario_id AS autor_id, i.visibilidad
      FROM Imagenes i
      JOIN Albumes a ON i.album_id = a.id_album
      JOIN Usuarios u ON a.usuario_id = u.id_usuario
      WHERE i.visibilidad = 'publica'
    `;
    params = [];
  }
  
  db.query(sql, params, callback);
};
