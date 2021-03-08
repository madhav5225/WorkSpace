var messages;//list of message that user is sending 
//object{id ,room_id,sender_id,message_body,message_type,is_seen,is_recieved,created_at}
// of room on which user clicked last time

var friendUser;
var userList;
var currentRoom;// room on which user clicked last time

function sendMsg(event) {
    event.preventDefault();

    const msg = $('#msgField').val();

    if (msg != '') {
        $('#messenger' + user_id[friendUser.id]).parent().prepend($('#messenger' + user_id[friendUser.id]));
        const room_id = generateRoomID(currentUser._id, friendUser.id);
        var msgObjId = 1;
        if (typeof messages != 'undefined')
            msgObjId = messages.length + 1;

        const msgObj = {
            id: msgObjId,
            room_id,
            msg,
            msg_type: "txt",
            sender_id: currentUser._id
        }
        messages = messages || [];
        messages.push(msgObj);
        var msg_container = $('<li class="msg me"  id="SenderMsg' + msgObj.id + '">');

        var listItem = $('<div class="text">').text(msgObj.msg);
        var statusItem = $('<span class="material-icons" id="msgIcon' + msgObj.id + '">autorenew</span>');

        $('.msglist').append(msg_container.append(listItem.append($('<div class ="msg-status">').append(statusItem))));


        $('.msglist')[0].scrollTop = $('.msglist')[0].scrollHeight;
        // document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight;
        socket.emit('send-msg', msgObj);
    }

    $('#msgField').val('').focus();

}
function setMessageInList(msg) {
    // $('#initialMsg').hide();

    if (msg.sender_id == currentUser._id) {

        if (msg.is_recieved == true || msg.is_seen == true) {
            if (!msg.is_seen) {
                $('#msgIcon' + msg.id).text('done_all');
            }
            else {
                $('#msgIcon' + msg.id).addClass('seen').text('done_all');
            }
        }
        else {
            $('#msgIcon' + msg.id).text('done');
        }
    }
    else {
        var msg_container = $('<li class="msg"  id="RecieverMsg' + msg.id + '">');
        var listItem = $('<div class="text">').text(msg.message_body);
        // var listItem = $('<li class="left  message-box" id="RecieverMsg' + msg.id + '">').text(msg.message_body);
        $('.msglist').append(msg_container.append(listItem));
        // $('.chat_ul').append(listItem);
        // document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight
        $('.msglist')[0].scrollTop = $('.msglist')[0].scrollHeight;

    }
}
function setChat(x) {
    // $('#initialMsg').show();
    currentRoom = 'undefined';
    $('.chat-section').removeClass('display');
    $('.chat-section').addClass('display');
    $('li').removeClass('on-screen');
    $('#messenger' + x).addClass('on-screen');
    var chatList = $('<ul class="msglist"></ul>')
    $('.message-container').html(chatList);
    friendUser = userList[x];
    // var img_element = $('<img src="../resources/defaultProfile.jpg">');
    var fullName = friendUser.fname + ' ' + friendUser.lname;

    $('#onScreen-name').text(fullName)

    if (friendUser.isOnline) {
        $('#onScreen-status').text("online");
    }
    else {
        $('#onScreen-status').text("offline");
    }

    const room_id = generateRoomID(currentUser._id, friendUser.id);
    messages = [];
    $.get('/roomInfo', { room_id, user1: currentUser._id, user2: friendUser.id }, function ({ msg, room }) {
        if (msg != 'success') {
            alert(msg);
            location.reload();
        }
        else {
            currentRoom = room;
            var tempMessages = currentRoom.messages;
            if (typeof tempMessages != 'undefined') {
                if (tempMessages.length !== 0) {
                    tempMessages.forEach(msgObj => {
                        if (msgObj.sender_id == currentUser._id) {
                            var msg_container = $('<li class="msg me"  id="SenderMsg' + msgObj.id + '">');
                            var listItem = $('<div class="text">').text(msgObj.message_body);
                            var statusItem = $('<span class="material-icons" id="msgIcon' + msgObj.id + '">autorenew</span>');
                            $('.msglist').append(msg_container.append(listItem.append($('<div class ="msg-status">').append(statusItem))));
                            $('.msglist')[0].scrollTop = $('.msglist')[0].scrollHeight;

                            // var listItem = $('<li class="right  message-box" id="SenderMsg' + msgObj.id + '">').text(msgObj.message_body);
                            // var statusItem = $('<span class="material-icons" id="msgIcon' + msgObj.id + '"></span>');
                            // $('.chat_ul').append(listItem.append(statusItem));
                            // document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight

                            messages.push(msgObj);
                        }
                        setMessageInList(msgObj);
                    });
                }
            }
        }
    });

    const roomObj = {
        room_id: generateRoomID(friendUser.id, currentUser._id),
        sender_id: friendUser.id,
        reciever_id: currentUser._id
    };

    socket.emit('successfully-seen-by-reciever', roomObj);
}

function setTypingOnChat(is_typing) {
    if (is_typing) {
        $('#onScreen-status').text('typing...');
    }
    else {
        $('#onScreen-status').text('online');
    }
}

function setTypingOnList(sender_id, is_typing) {
    console.log(user_id[sender_id] + " " + is_typing);
}

function typingTimeout() {
    typing = false;
    socket.emit('typing', { room_id: currentRoom.room_id, sender_id: currentUser._id, reciever_id: friendUser.id, typing: false });
}

$(document).ready(function () {
    $('#msgField').keypress((e) => {
        if (e.which != 13) {
            typing = true;
            if (currentRoom != undefined) {
                socket.emit('typing', { room_id: currentRoom.room_id, sender_id: currentUser._id, reciever_id: friendUser.id, typing: true });
                clearTimeout(timeout);
                timeout = setTimeout(typingTimeout, 1000);
            }
        }
        else {
            typing = false;
            clearTimeout(timeout);
            typingTimeout();
            sendMsg(e);
        }
    })
})