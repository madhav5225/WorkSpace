function sendMsg(event) {
    event.preventDefault();
    console.log(friendUser);
    const msg = $('#msg_text').val();
    console.log(msg);
    const conversation_id = generateConversationID(currentUser._id, friendUser.id);
    var msgId;
    if (typeof messageList[conversation_id] == 'undefined' || messageList[conversation_id].length == 0)
        msgId = 1;
    else {
        //console.log('messengers' + messageList[conversation_id]);
        msgId = messageList[conversation_id][messageList[conversation_id].length - 1].msgId + 1;
    }
    if (msg != '') {
        if ($('#before_conversation').is(':visible')) {
            $('#chat_ul').show();
            $('#before_conversation').hide();
        }
        ($('<li class="right  message-box" id="msg'+msgId+'">')
        .text(msg)).appendTo('#chat_ul').append('<i class="material-icons" id="msgIcon'+msgId+'">autorenew</i>');;
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
            },function(data){
                console.log(data);
                $('#msgIcon'+msgId).text('done');
                var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var obj = {
                    msgId: msgId,
                    msg: msg,
                    msgType: 'txt',
                    isSeen:0,
                    sender_id: currentUser._id,
                    receiver_id: friendUser.id,
                    sendAt: time,
                    recievedAt: time,
                };
                messageList[conversation_id] = messageList[conversation_id] || [];
                messageList[conversation_id].push(obj);
            })
            //$('msg'+msgId).text('done');
        //  $('#chat_ul').animate({scrollTop: $last.offset().top}, 500);        
    }

    $('#msg_text').val('').focus();

}
function setChat(x) {
    console.log(x);
    var fullName = userList[x].fname + ' ' + userList[x].lname;
    friendUser = userList[x];
    document.getElementById('chatName').innerHTML = fullName;
    const conversation_id = generateConversationID(currentUser._id, userList[x].id);
    console.log(conversation_id);

    $.get('/msgList', { conversation_id }, function (message) {
        console.log('messag');

        //console.log(message);
        $('#chat_ul').text('');

        for (var i = 0; i < message.length; i++) {
            var obj = {
                msgId: message[i].msgId,
                msg: message[i].msg,
                msgType: message[i].msg_type,
                isSeen: message[i].isSeen,
                sender_id: message[i].sender_id,
                receiver_id: message[i].receive_id,
                sendAt: message[i].sendAt,
                recievedAt: message[i].recievedAt,
            };
            console.log(obj.sender_id);
            console.log(currentUser._id);
            
            if (obj.sender_id == currentUser._id) {
                if (obj.isSeen == 0)
                    ($('<li class="right  message-box" id=msg' + obj.msgId + '>').
                        text(obj.msg)).appendTo('#chat_ul').
                        append('<i class="material-icons" id="msgIcon'+obj.msgId+'">done_all</i>');
                else
                    ($('<li class="right  message-box" id=msg' + obj.msgId + '>').
                        text(obj.msg)).appendTo('#chat_ul').
                        append('<i class="material-icons"style="color:red id="msgIcon'+obj.msgId+'">">done_all</i>');
                        
                       // $('#msg'+obj.msgId).append('<i class="material-icons">done_all</i>');
                    }
            else
                ($('<li class="right  message-box" id=msg' + obj.msgId + '>').text(obj.msg)).appendTo('#chat_ul');
            $('#initialMsg').text('');

            messageList[conversation_id] = messageList[conversation_id] || [];
            messageList[conversation_id].push(obj);
        }
        //console.log('messengers'+messageList[conversation_id][0].msg);
        // ($('<li class="left  message-box">').text('helllll')).appendTo('#chat_ul');

    }).fail(function (data) {
        console.log("error: " + data);
    });
}