const friendDB = require('../models/friend.model');
const userDB = require('../models/user.model');
const notificationDB = require('../models/notification.model');
const { sendNotification } = require('../config/socket.config');

exports.viewUsers = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  userDB.getAllUsers((err, allUsersFromDB) => {
    if (err) return res.status(500).send('Error al cargar usuarios.');

    const currentUserId = req.session.user.id_usuario;
    const users = allUsersFromDB.filter(u => u.id_usuario !== currentUserId);

    friendDB.getPendingOrExistingRequests(currentUserId, (err, requests) => {
      if (err) return res.status(500).send('Error al cargar solicitudes.');

      const pendingStatus = {};
      requests.forEach(r => {
        if (r.usuario_id === currentUserId) {
          pendingStatus[r.amigo_id] = true;
        } else if (r.amigo_id === currentUserId) {
          pendingStatus[r.usuario_id] = true;
        }
      });

      const usersWithStatus = users.map(u => ({
        ...u,
        pending: !!pendingStatus[u.id_usuario]
      }));

      res.render('users', { 
        user: req.session.user, 
        users: usersWithStatus 
      });
    });
  });
};

exports.viewFriends = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user.id_usuario;
  friendDB.getFriends(userId, (err, friends) => {
    if (err)
      return res.status(500).send('Error al obtener tus contactos.');
    res.render('friends', { user: req.session.user, friends });
  });
};



exports.viewRequests = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  friendDB.getPendingRequests(req.session.user.id_usuario, (err, requests) => {
    if (err) return res.status(500).send('Error al obtener solicitudes.');
    res.render('requests', { user: req.session.user, requests });
  });
};

exports.addFriend = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user.id_usuario;
  const friendId = parseInt(req.body.friendId, 10);

  friendDB.sendFriendRequest(userId, friendId, (err) => {
    if (err) return res.status(500).send('Error al enviar solicitud.');

    const message = `${req.session.user.nombre} te ha enviado una solicitud de amistad.`;
    const target_url = '/requests';

    notificationDB.createNotification(friendId, 'solicitud', message, target_url, (err) => {
      if (err) {
        console.error('❌ Error al crear notificación de amistad:', err.message);
      }
      sendNotification(friendId, message);
      res.redirect('/users');
    });
  });
};

exports.acceptFriend = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user.id_usuario;
  const friendId = parseInt(req.body.friendId);

  friendDB.acceptRequest(userId, friendId, (err) => {
    if (err) return res.status(500).send('Error al aceptar solicitud.');
    res.redirect('/requests');
  });
};

exports.rejectFriend = (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const userId = req.session.user.id_usuario;
  const friendId = parseInt(req.body.friendId);

  friendDB.rejectRequest(userId, friendId, (err) => {
    if (err) return res.status(500).send('Error al rechazar solicitud.');
    res.redirect('/requests');
  });
};
