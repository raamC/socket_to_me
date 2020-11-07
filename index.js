const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

let users = []
io.on('connect', (socket) => {
    console.log('user connected');

    socket.on('setusername', (username) => {
        socket.username = username
        users.push(username)
        socket.emit("newUser", `${username} joined. Online users: ${users.toString()}`)
    })

    socket.on('disconnect', () => {
        users = users.filter(u => u != socket.username)
        socket.broadcast.emit('userLeft', `${socket.username} left. Online users: ${users.toString()}`);
    });

    socket.on('chat message', (message) => {
        console.log('message: ' + message);
        socket.broadcast.emit('chat message', message);
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000')
});