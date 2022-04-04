var socket = io('https://lamvantan-nodejs.herokuapp.com');

socket.on('server-send-register-error', function(data) {
    $('#error').html(data)
})

socket.on('server-send-register-success', function(data) {
    $('#currentUser').html(data);
    $('#loginFrom').hide();
    $('#chatFrom').show();
});

socket.on('server-send-list-data', function(data) {
    console.log(data);
    $('#chats').html('');
    data.forEach(function(i) {
        $('#chats').append('<a class="filterDiscussions all unread single" id="list-chat-list5" data-toggle="list" role="tab">'
            +'<div class="status">'
            +'<i class="material-icons online">fiber_manual_record</i>'
            +'</div>'
            +'<div class="data p-2 ml-2">'
            +'<h5>' + i + '</h5>'
            +'<p>Đã tham gia</p>'
            +'</div>')
    });
})

socket.on('server-send-message', function(data) {
    var name = $('#currentUser').text();

    $('#listMessage').append(
    (name != data.name 
    ? 
    '<div class="message">'
        +'<b class="mb-4 mr-1 text-black">' + data.name + ': </b>'
        +'<div class="text-main">'
            +'<div class="text-group">'
                +'<div class="text">'
                    +'<p>' + data.message + '</p>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>' 
    : 
    '<div class="message me">'
        +'<div class="text-main">'
            +'<div class="text-group me">'
                +'<div class="text me">'
                    +'<p>' + data.message + '</p>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>')
   );
})

socket.on('start-message', function(data) {
    $('#startMessage').html('<div class="message">'
    +'<b class="mb-4 mr-1 text-black">' + data + ': </b>'
    +'<div class="text-main">'
        +'<div class="text-group">'
            +'<div class="text typing">'
                +'<div class="wave">'
                    +'<span class="dot"></span>'
                    +'<span class="dot"></span>'
                    +'<span class="dot"></span>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    +'</div>');
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
        if ($('#input-name').val() != '') {
            socket.emit('client-register', $('#input-name').val());
            $('#input-name').val('');
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
        if ($('#text-message').val() != '') {
            socket.emit('user-send-message', $('#text-message').val());
            $('#text-message').val('');
        }
    });

    $('#text-message').focusin(function() {
        socket.emit('start-message');
    })

    $('#text-message').focusout(function() {
        socket.emit('stop-message');
    });

    $('#btnRoom').click(function() {
        socket.emit('create-room', $('#text-room').val());
    })

    $('#sendMessageRoom').click(function() {
        socket.emit('send-message-room', $('#messageRoom').val());
    });

    $(document).keyup(function (e) {
        if ($("#text-message").is(":focus") && (e.keyCode == 13)) {
            if ($('#text-message').val() != '') {
                socket.emit('user-send-message', $('#text-message').val());
                $('#text-message').val('');     
            }
        }
    });
});


