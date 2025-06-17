const db = require('../models/db');
const albumDB = require('../models/album.model');
const userDB = require('../models/user.model');

exports.viewProfile = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).send("ID de usuario no válido");
  }
  userDB.getUserById(userId, (err, user) => {
    if (err || !user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.render('profile', { user: user });
  });
};

exports.viewFriendDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('friend-dashboard', { user: req.session.user });
};

//FUTURA IMPLEMENTACION
// exports.viewFriendDashboard = (req, res) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }

//   const friendId = parseInt(req.params.id, 10);
//   if (isNaN(friendId)) {
//     return res.status(400).send("ID de usuario no válido");
//   }

//   userDB.getUserById(friendId, (err, friend) => {
//     if (err || !friend) {
//       return res.status(404).send("Usuario no encontrado");
//     }

//     albumDB.getAlbumsByUser(friendId, (err, albums) => {
//       if (err) {
//         return res.status(500).send("Error al cargar los álbumes");
//       }

//       res.render('friend-dashboard', {
//         user: req.session.user,
//         friend: friend,
//         albums: albums
//       });
//     });
//   });
// };
