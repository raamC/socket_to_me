const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.broadcast.emit("newUser", "A new user joined")

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('disconnect', 'A user left');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000')
});