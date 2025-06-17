const bcrypt = require('bcrypt');
const userDB = require('../models/user.model');
const albumDB = require('../models/album.model');

exports.getLogin = (req, res) => {
    res.render('login', { error: req.session.error });
    req.session.error = null;
};



exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.session.error = 'Por favor, completa todos los campos.';
        return res.redirect('/login');
    }

    userDB.findByEmail(email, (err, user) => {
        if (err) {
            req.session.error = 'Error en la base de datos.';
            return res.status(500).redirect('/login');
        }

        if (!user) {
            req.session.error = 'Usuario no encontrado.';
            return res.redirect('/login');
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                req.session.error = 'Error al comparar contraseñas.';
                return res.status(500).redirect('/login');
            }

            if (match) {
                req.session.user = user;
                return res.redirect('/dashboard');
            }

            req.session.error = 'Contraseña incorrecta.';
            res.redirect('/login');
        });
    });
};

exports.getRegister = (req, res) => {
    res.render('register', { error: req.session.error });
    req.session.error = null;
};

exports.postRegister = (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        req.session.error = 'Todos los campos son obligatorios.';
        return res.redirect('/register');
    }

    userDB.findByEmail(email, (err, user) => {
        if (err) {
            req.session.error = 'Error en la base de datos.';
            return res.status(500).redirect('/register');
        }

        if (user) {
            req.session.error = 'El correo ya está registrado.';
            return res.redirect('/register');
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                req.session.error = 'Error al encriptar contraseña.';
                return res.status(500).redirect('/register');
            }

            const newUser = { nombre, apellido, email, password: hash };
            userDB.createUser(newUser, (err) => {
                if (err) {
                    req.session.error = 'Error al crear usuario.';
                    return res.status(500).redirect('/register');
                }
                res.redirect('/login');
            });
        });
    });
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    console.log("No hay usuario en la sesión");
    req.session.error = 'Por favor, inicia sesión para acceder al panel.';
    return res.redirect('/login');
  }

  console.log("Usuario en sesión:", req.session.user);
  const userId = req.session.user.id_usuario;
  console.log("Buscando álbumes para el usuario id:", userId);

  albumDB.getAlbumsByUser(userId, (err, albums) => {
    if (err) {
      console.error("Error al cargar álbumes:", err);
      return res.status(500).send("Error al cargar tu dashboard.");
    }
    res.render('dashboard', {
      user: req.session.user,
      albums: albums
    });
  });
};





exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};