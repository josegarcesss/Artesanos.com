const notificationDB = require('../models/notification.model');

exports.viewNotifications = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const userId = req.session.user.id_usuario;

  notificationDB.getUnreadNotifications(userId, (err, notifications) => {
    if (err) return res.status(500).send('Error al cargar notificaciones.');

    notificationDB.markAsRead(userId, () => {
      res.render('notifications', { user: req.session.user, notifications });
    });
  });
};


exports.createNotification = (userId, type, message, callback) => {
  const sql = 'INSERT INTO Notificaciones (usuario_id, tipo, mensaje) VALUES (?, ?, ?)';
  db.query(sql, [userId, type, message], callback);
};