const db = require('./db');

exports.getAllUsers = (callback) => {
    const sql = 'SELECT id_usuario, nombre, apellido, imagen_perfil FROM Usuarios';
    db.query(sql, callback);
};

exports.findByEmail = (email, callback) => {
    const sql = 'SELECT * FROM Usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

exports.getUserById = (id, callback) => {
  const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
  db.query(sql, [id], (err, results) => {
    if(err) return callback(err);
    callback(null, results[0]);
  });
};



exports.createUser = (user, callback) => {
    const { nombre, apellido, email, password } = user;
    const sql = 'INSERT INTO Usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, email, password], callback);
};

exports.searchUsers = (query, callback) => {
  const sql = `
    SELECT id_usuario, nombre, apellido, email, imagen_perfil 
    FROM Usuarios 
    WHERE nombre LIKE ? OR apellido LIKE ? OR email LIKE ?
  `;
  const term = `%${query}%`;
  db.query(sql, [term, term, term], callback);
};
