$(function () {
    function appendIncomingMessage(message) {
        $('#messages').append($('<li>').addClass('incoming').text(message));
    }

    function appendOutgoingMessage(message) {
        $('#messages').append($('<li>').addClass('outgoing').text(message));
    }

    function appendNotification(message) {
        $('#messages').append($('<li>').addClass('notification').text(message));
    }

    const socket = io();
    let username = "";

    socket.on('connect', () => {
        username = prompt("Please enter your name");
        $('#username').text(`Logged in as: ${username}`)
        socket.emit('setUsername', username)
    });

    $('#messageForm').submit(function (e) {
        e.preventDefault(); // prevents page reloading

        const message = `${username}: ${$('#m').val()}`
        appendOutgoingMessage(message)
        socket.emit('chat message', message);

        $('#m').val('');
        return false;
    });

    socket.on('newUser', message => appendNotification(message));

    socket.on('userLeft', message => appendNotification(message));

    socket.on('chat message', message => appendIncomingMessage(message));
});