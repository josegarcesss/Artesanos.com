const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('./config/session.config');


app.set('view engine', 'pug');
app.set('views', './views');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);


app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido a Artesanos.com' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});