const db = require('./db');

exports.sendFriendRequest = (userId, friendId, callback) => {
    db.query(
        'INSERT INTO Amistades (usuario_id, amigo_id, estado) VALUES (?, ?, "pendiente")',
        [userId, friendId],
        callback
    );
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
    db.query(
        `SELECT u.* FROM Usuarios u
         JOIN Amistades a ON u.id_usuario = a.usuario_id OR u.id_usuario = a.amigo_id
         WHERE ((a.usuario_id = ? OR a.amigo_id = ?) AND a.estado = "aceptado" AND u.id_usuario != ?)`,
        [userId, userId, userId],
        callback
    );
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
