$(function () {
    function appendMessage(message) {
        $('#messages').append($('<li>').text(message));
    }

    const socket = io();
    let username = "";

    socket.on('connect', () => {
        username = prompt("Please enter your name");
        socket.emit('setusername', username)
    });

    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading

        const message = `${username}: ${$('#m').val()}`
        appendMessage(message)
        socket.emit('chat message', message);

        $('#m').val('');
        return false;
    });

    socket.on('newUser', message => appendMessage(message));

    socket.on('userLeft', message => appendMessage(message));

    socket.on('chat message', message => appendMessage(message));
});