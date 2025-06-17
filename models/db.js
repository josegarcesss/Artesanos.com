require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});



module.exports = {
    query: (sql, args, callback) => {
        connection.query(sql, args, callback);
    }
};

