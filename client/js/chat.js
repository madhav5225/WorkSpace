
var friendUser;
var userList;
var currentRoom;// room on which user clicked last time

function sendMsg(event) {
    event.preventDefault();

    const msg = $('#msg_text').val();

    if (msg != '') {
        $('#messenger' + user_id[friendUser.id]).parent().prepend($('#messenger' + user_id[friendUser.id]));
        const room_id = generateRoomID(currentUser._id, friendUser.id);
        var msgObjId = 1;
        if (typeof messageObj[friendUser.id] != 'undefined')
            msgObjId = messageObj[friendUser.id].senderMessagesCount + 1;
        messageObj[friendUser.id].senderMessagesCount += 1;
        const msgObj = {
            id: msgObjId,
            room_id,
            message_body: msg,
            msg_type: "txt",
            sender_id: currentUser._id,
            reciever_id: friendUser.id,
            is_seen: false,
            is_recieved: false,
        }
        const msgSch = {
            id: msgObjId,
            room_id,
            sender_id: currentUser._id,
            message_body: msg,
            message_type: "txt",
            is_seen: false,
            is_recieved: false,
            created_at: 0,
        }

        var listItem = $('<li class="right  message-box" id="SenderMsg' + msgObj.id + '">').text(msgObj.message_body);
        var statusItem = $('<span class="material-icons" id="msgIcon' + msgObj.id + '">autorenew</span>');

        $('.chat_ul').append(listItem.append(statusItem));

        messages = messages || [];
        messages.push(msgObj);
        document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight
        socket.emit('send-msg', msgObj);
    }

    $('#msg_text').val('').focus();

}
function setMessageInList(msg) {
    $('#initialMsg').hide();

    if (msg.sender_id == currentUser._id) {
        if (!msg.is_recieved) {
            $('#msgIcon' + msg.id).text('done');
        }
        else {
            if (!msg.is_seen) {
                $('#msgIcon' + msg.id).text('done_all');
            }
            else {
                $('#msgIcon' + msg.id).addClass('seen').text('done_all');
            }
        }
    }
    else {
        var listItem = $('<li class="left  message-box" id="RecieverMsg' + msg.id + '">').text(msg.message_body);
        $('.chat_ul').append(listItem);
        document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight

    }
}
function setChat(x) {
    $('#initialMsg').show();
    var chatList = $('<ul class="chat_ul chat_conatiner w-100" style="list-style-type: none;""></ul>');

    $('#messageHolder').html(chatList);
    friendUser = userList[x];

    var fullName = friendUser.fname + ' ' + friendUser.lname;

    $('#chat-title').text(fullName)

    const room_id = generateRoomID(currentUser._id, friendUser.id);

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
                            var listItem = $('<li class="right  message-box" id="SenderMsg' + msgObj.id + '">').text(msgObj.message_body);
                            var statusItem = $('<span class="material-icons" id="msgIcon' + msgObj.id + '"></span>');
                            $('.chat_ul').append(listItem.append(statusItem));
                            document.getElementById('messageHolder').scrollTop = document.getElementById('messageHolder').scrollHeight
                            messages = messages || [];
                            messages.push(msgObj);
                        }
                        setMessageInList(msgObj);
                    });
                }
            }
        }


        const roomObj = {
            room_id: generateRoomID(friendUser.id, currentUser._id),
            sender_id: friendUser.id,
            reciever_id: currentUser._id
        };

        socket.emit('successfully-seen-by-reciever', roomObj);
    })
};

function setTypingOnChat(is_typing) {
            if (is_typing) {
                $('#chat-status').text('typing...');
            }
            else {
                $('#chat-status').text('');
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
            $('#msg_text').keypress((e) => {
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