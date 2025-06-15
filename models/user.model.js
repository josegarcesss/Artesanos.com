const db = require('./db');

exports.getAllUsers = (callback) => {
    const sql = 'SELECT id_usuario, nombre, apellido, imagen_perfil FROM Usuarios';
    db.query(sql, callback);
};

/*exports.findByEmail = (email, callback) => {
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};*/

exports.findByEmail = (email, callback) => {
    const sql = 'SELECT * FROM Usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};


exports.createUser = (user, callback) => {
    const { nombre, apellido, email, password } = user;
    const sql = 'INSERT INTO Usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, email, password], callback);
};