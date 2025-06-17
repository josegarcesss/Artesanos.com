const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const session = require('./config/session.config');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const friendRoutes = require('./routes/friend.routes');
app.use('/', friendRoutes);

const albumRoutes = require('./routes/album.routes');
app.use('/', albumRoutes);

const commentRoutes = require('./routes/comment.routes');
app.use('/', commentRoutes);

const notificationRoutes = require('./routes/notification.routes');
app.use('/', notificationRoutes);

app.get('/', (req, res) => {
    res.render('login', { title: 'Bienvenido a Artesanos.com' });
});

const io = require('socket.io')(http);
const { initSocket } = require('./config/socket.config');
initSocket(io);



http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});