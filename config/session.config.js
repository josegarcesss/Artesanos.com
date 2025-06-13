const session = require('express-session');

module.exports = session({
    secret: process.env.SESSION_SECRET || 'codigo_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
});
