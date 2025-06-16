const friendDB = require('../models/friend.model');
const userDB = require('../models/user.model');

exports.viewUsers = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    userDB.getAllUsers((err, allUsersFromDB) => {
        if (err) return res.status(500).send('Error al cargar usuarios.');

        const userId = req.session.user.id_usuario;
        const users = allUsersFromDB.filter(u => u.id_usuario !== userId);

        res.render('users', { user: req.session.user, users });
    });
};

exports.viewFriends = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    friendDB.getFriends(req.session.user.id_usuario, (err, friends) => {
        if (err) return res.status(500).send('Error al obtener contactos.');
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
    const friendId = parseInt(req.body.friendId);

    friendDB.sendFriendRequest(userId, friendId, (err) => {
        if (err) return res.status(500).send('Error al enviar solicitud.');
        res.redirect('/users');
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
