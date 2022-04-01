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
    })
})