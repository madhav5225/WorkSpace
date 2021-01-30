function sendMsg(event) {
    event.preventDefault();
    console.log(friendUser);
    const msg = $('#msg_text').val();
    console.log(msg);
    const conversation_id = generateConversationID(currentUser._id, friendUser.id);
    var msgId, msgId2, msgId1;
    if (typeof messageList[conversation_id] == 'undefined' || messageList[conversation_id].length == 0)
        msgId1 = 1;
    else
        msgId1 = messageList[conversation_id][messageList[conversation_id].length - 1].msgId + 1;

    if (typeof unDeliveredList[conversation_id] == 'undefined' || unDeliveredList[conversation_id].length == 0)
        msgId2 = 1;
    else
        msgId2 = unDeliveredList[conversation_id][unDeliveredList[conversation_id].length - 1].msgId + 1;
    msgId = msgId1;
    if (msgId2 > msgId)
        msgId = msgId2;

    var friendUserId = emailToUserId[friendUser.email];
    ($('<li class="right  message-box" id="chat_ul' + friendUserId + 'msg' + msgId + '">')
        .text(msg)).appendTo('#chat_ul' + friendUserId)
        .append('<i class="material-icons" id="chat_ul' + friendUserId + 'msgIcon' + msgId + '">autorenew</i>');;
    $.post('/sendMsg',
        {
            conversation_id: conversation_id,
            msgId: msgId,
            msg: msg,
            msg_type: "txt",
            isSeen: 0,
            sender_id: currentUser._id,
            receiver_id: friendUser.id,
            userEmail: friendUser.email
        }, function (data) {
            console.log(data);
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            var obj = {
                msgId: msgId,
                msg: msg,
                msgType: 'txt',
                isSeen: 0,
                sender_id: currentUser._id,
                receiver_id: friendUser.id,
                sendAt: time,
                recievedAt: time,
            };
            if (data === 'msg not sent')
                $('#chat_ul' + friendUserId + 'msg' + msgId).remove();
            else if (data === 'msg is sent to online user') {
                $('#chat_ul' + friendUserId + 'msgIcon' + msgId).text('done_all');
                messageList[conversation_id] = messageList[conversation_id] || [];
                messageList[conversation_id].push(obj);
            }
            else {
                $('#chat_ul' + friendUserId + 'msgIcon' + msgId).text('done');
                unDeliveredList[conversation_id] = unDeliveredList[conversation_id] || [];
                unDeliveredList[conversation_id].push(obj);
            }

            //$('msg'+msgId).text('done');
            //  $('#chat_ul').animate({scrollTop: $last.offset().top}, 500); 
        }).fail(err => {
            console.log('msg not sent');
            console.log(err);
            $('#chat_ul' + msgId + 'msg' + msgId).remove();
        })



    $('#msg_text').val('').focus();

}
function setMessagesInList(obj, x, status) {
    $('#initialMsg').hide();
    if (obj.sender_id == currentUser._id) {
        if (obj.isSeen == 0) {
            var listItem = $('<li class="right  message-box" id=chat_ul' + x + 'msg' + obj.msgId + '>').text(obj.msg);
            var statusItem = $('<i class="material-icons" id="chatul' + x + 'msgIcon' + obj.msgId + '">' + status + '</i>');
        }
        else {
            var listItem = $('<li class="right  message-box" id=chat_ul' + x + 'msg' + obj.msgId + '>').text(obj.msg);
            var statusItem = $('<i class="material-icons" style="color:red" id="chatul' + x + 'msgIcon' + obj.msgId + '">' + status + '</i>');
        }
        $('.chat_ul').append(listItem.append(statusItem));
    }
    else {
        var listItem = $('<li class="left  message-box" id=chat_ul' + x + 'msg' + obj.msgId + '>').text(obj.msg);
        $('.chat_ul').append(listItem);
    }
}
function setChat(x) {
    $('#initialMsg').show();
    var chatList = $('<ul class="chat_ul chat_conatiner w-100" style="list-style-type: none;""></ul>')
    
    $('#messageHolder').html(chatList);

    friendUser = userList[x];

    var fullName = friendUser.fname + ' ' + friendUser.lname;

    $('#chat-title').text(fullName)

    const conversation_id = generateConversationID(currentUser._id, friendUser.id);
    console.log(conversation_id);

    $.get('/msgList', { conversation_id: conversation_id, delivered: 'delivered' }, function (message) {
        console.log('message');
        for (var i = 0; i < message.length; i++) {
            var obj = message[i];
            console.log(obj);
            setMessagesInList(obj, x, 'done_all');
            messageList[conversation_id] = messageList[conversation_id] || [];
            messageList[conversation_id].push(obj);
        }
    }).fail(function (data) {
        console.log("error: " + data);
        location.reload();
    });

    $.get('/msgList', { conversation_id: conversation_id, delivered: 'undelivered' }, function (message) {
        console.log('messag');
        for (var i = 0; i < message.length; i++) {
            var obj = message[i];
            console.log(obj);
            setMessagesInList(obj, x, 'done');
            unDeliveredList[conversation_id] = unDeliveredList[conversation_id] || [];
            unDeliveredList[conversation_id].push(obj);
        }
    }).fail(function (data) {
        console.log("error: " + data);
        location.reload();
    });
}