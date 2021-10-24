const server = require('./app');
const socketIO = require('socket.io');
port = process.env.PORT || 5000;


global.io = socketIO(server);

io.on('connection', () => {
    console.log("connect-socket");
});

server.listen(port,  () => console.log(`Server start, port = ${port}`));
