var socket = io('/');

socket.on('server-send-register-error', function(data) {
    $('#error').html(data)
})

socket.on('server-send-register-success', function(data) {
    $('#currentUser').html(data);
    $('#loginFrom').hide();
    $('#chatFrom').show();
});

socket.on('server-send-list-data', function(data) {
    $('#box-content').html('');
    data.forEach(function(i) {
        $('#box-content').append('<div class="user">' + i + '</div>')
    })
})

socket.on('server-send-message', function(data) {
    $('#listMessage').append('<p style="color:black">' + data.name + ': ' + data.message + '</p>')
})

socket.on('start-message', function(data) {
    $('#startMessage').html('<img src="/image/send.gif" width="30" />' + data);
});

socket.on('stop-message', function() {
    $('#startMessage').html('');
});

socket.on('server-send-rooms', function(data) {
    $('#all-room').html('');
    data.map(function(r) {
        $('#all-room').append('<h4 class="room">' + r + '</h4>');
    });
});

socket.on('server-send-room-socket', function(data) {
    $('#room-current').html(data);
});

socket.on('server-chat', function(data) {
    $('#listMessageRoom').append('<p style="color:black">' + data + '</p>')
});

$(document).ready(function() {
    $('#loginFrom').show();
    $('#chatFrom').hide();

    $('#btnRegister').click(function() {
        if ($('#text-user').val() != '') {
            socket.emit('client-register', $('#text-user').val());
            $('#text-user').val('');
        } else {
            $('#error').html('Vui lòng đặt nickname bạn ơi: ')
        }
    });

    $('#btnLogout').click(function() {
        socket.emit('client-logout');
        $('#chatFrom').hide(2000);
        $('#loginFrom').show(1000);
    });

    $('#sendMessage').click(function() {
        if ($('#message').val() != '') {
            socket.emit('user-send-message', $('#message').val());
            $('#message').val('');
        }
    });

    $('#message').focusin(function() {
        socket.emit('start-message');
    })

    $('#message').focusout(function() {
        socket.emit('stop-message');
    });

    $('#btnRoom').click(function() {
        socket.emit('create-room', $('#text-room').val());
    })

    $('#sendMessageRoom').click(function() {
        socket.emit('send-message-room', $('#messageRoom').val());
    });
})