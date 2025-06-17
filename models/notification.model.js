const db = require('./db');

exports.createNotification = (userId, type, message, target_url, callback) => {
  const sql = 'INSERT INTO notificaciones (usuario_id, tipo, mensaje, target_url) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, type, message, target_url], callback);
};

exports.getUnreadNotifications = (userId, callback) => {
  const sql = 'SELECT * FROM notificaciones WHERE usuario_id = ? AND leido = 0 ORDER BY fecha DESC';
  db.query(sql, [userId], callback);
};

exports.markAsRead = (userId, callback) => {
  const sql = 'UPDATE notificaciones SET leido = 1 WHERE usuario_id = ? AND leido = 0';
  db.query(sql, [userId], callback);
};





exports.getAllNotifications = (userId, callback) => {
  const sql = 'SELECT *, target_url FROM Notificaciones WHERE usuario_id = ? ORDER BY fecha DESC';
  db.query(sql, [userId], callback);
};



