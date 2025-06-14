const bcrypt = require('bcrypt');
const userDB = require('../models/user.model');

exports.getLogin = (req, res) => {
    res.render('login', { error: req.session.error });
};

exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    userDB.findByEmail(email, (err, user) => {
        if (err) return res.send('Error en la base de datos.');
        if (!user) return res.render('login', { error: 'Usuario no encontrado' });

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.send('Error al comparar contraseñas.');

            if (match) {
                req.session.user = user;
                return res.redirect('/dashboard');
            }

            res.render('login', { error: 'Contraseña incorrecta' });
        });
    });
};

exports.getRegister = (req, res) => {
    res.render('register', { error: req.session.error });
};

exports.postRegister = (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        return res.render('register', { error: 'Todos los campos son obligatorios.' });
    }

    userDB.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Error en la base de datos.');
        if (user) return res.render('register', { error: 'El correo ya está registrado.' });

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).send('Error al encriptar contraseña.');

            const newUser = { nombre, apellido, email, password: hash };
            userDB.createUser(newUser, (err) => {
                if (err) return res.status(500).send('Error al crear usuario.');
                res.redirect('/login');
            });
        });
    });
};

exports.getDashboard = (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};