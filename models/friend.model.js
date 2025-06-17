const db = require('./db');

exports.sendFriendRequest = (userId, friendId, callback) => {
  const sqlCheck = `
    SELECT * FROM amistades 
    WHERE (usuario_id = ? AND amigo_id = ?)
       OR (usuario_id = ? AND amigo_id = ?)
  `;
  db.query(sqlCheck, [userId, friendId, friendId, userId], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      return callback(new Error("Ya se ha enviado una solicitud de amistad o ya son amigos."));
    }
    const sqlInsert = `
      INSERT INTO amistades (usuario_id, amigo_id, estado)
      VALUES (?, ?, 'pendiente')
    `;
    db.query(sqlInsert, [userId, friendId], callback);
  });
};

exports.getPendingOrExistingRequests = (userId, callback) => {
  const sql = `
    SELECT * FROM amistades
    WHERE (usuario_id = ? OR amigo_id = ?) AND estado = 'pendiente'
  `;
  db.query(sql, [userId, userId], callback);
};



exports.getPendingRequests = (userId, callback) => {
    db.query(
        `SELECT u.* FROM Usuarios u
         JOIN Amistades a ON u.id_usuario = a.usuario_id
         WHERE a.amigo_id = ? AND a.estado = "pendiente"`,
        [userId],
        callback
    );
};

exports.getFriends = (userId, callback) => {
  const sql = `
    SELECT DISTINCT u.*
    FROM Usuarios u 
    JOIN (
      SELECT CASE 
               WHEN usuario_id = ? THEN amigo_id 
               ELSE usuario_id 
             END AS friendId
      FROM amistades
      WHERE (usuario_id = ? OR amigo_id = ?) AND estado = 'aceptado'
    ) f ON u.id_usuario = f.friendId
  `;
  db.query(sql, [userId, userId, userId], callback);
};

exports.acceptRequest = (userId, friendId, callback) => {
    db.query(
        'UPDATE Amistades SET estado = "aceptado" WHERE usuario_id = ? AND amigo_id = ? AND estado = "pendiente"',
        [friendId, userId],
        callback
    );
};

exports.rejectRequest = (userId, friendId, callback) => {
    db.query(
        'DELETE FROM Amistades WHERE usuario_id = ? AND amigo_id = ? AND estado = "pendiente"',
        [friendId, userId],
        callback
    );
};
