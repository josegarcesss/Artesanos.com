const db = require('./db');

exports.findByEmail = (email, callback) => {
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

exports.createUser = (user, callback) => {
    const { nombre, apellido, email, password } = user;
    db.query(
        'INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)',
        [nombre, apellido, email, password],
        callback
    );
};