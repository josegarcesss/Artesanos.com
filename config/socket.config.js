let ioInstance;
let connectedUsers = {};

function initSocket(io) {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('registerUser', (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`Usuario registrado: ${userId}`);
    });

    socket.on('disconnect', () => {
      for (let userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          break;
        }
      }
      console.log('Cliente desconectado');
    });
  });
}

function sendNotification(userId, message) {
  if (ioInstance && connectedUsers[userId]) {
    ioInstance.to(connectedUsers[userId]).emit('newNotification', message);
  } else {
    console.log(`No hay socket registrado para el usuario ${userId}`);
  }
}

module.exports = { initSocket, sendNotification };

