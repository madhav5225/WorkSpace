var currentUser;
var friendUser;
var userList;
var idOfOnlineLogo = [];
var messageList = {};
var unDeliveredList = {};
var deliveredButNotSeen = {};
var emailToUSerId = [];

function generateConversationID(a, b) {
    const k1 = parseInt(a, 16);
    const k2 = parseInt(b, 16);
    const y = (((k1 + k2) * (k1 + k2 + 1)) / 2) + (k1 * k2);
    return y.toString(16);
}
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
function setHoverOnMessengers() {
    for (var i = 0; i < userList.length; i++) {
        $("#messenger" + i).hover(function () {
            // console.log('hello');
            $(this).css("background-color", "RGB(100,200,100)");
        }, function () {
            $(this).css("background-color", "white");
        });
    }
}
function setprofile() {
    $.get('/profile', function (data) {
        const { success, name, email } = data;
        currentUser = {
            _id: data._id,
            name: data.name,
            email: data.email,
        };
        if (success) {
            console.log(name + " " + email);
            $('#profile_name').text(name);
            $('#profile_email').text(email);
        }
    });
}

function getUserList() {
    $.get('/usersList', function (data) {
        // console.log(data);   
        userList = data;
        setMessengers(data);
        setHoverOnMessengers();
    })
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
function setMessengers(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].currentUser == true)
            continue;
        var user = document.createElement('li');
        var OnlineLogo = document.createElement('span');
        var fullName = data[i].fname + ' ' + data[i].lname;
        user.setAttribute("onclick", "setChat('" + i + "');");
        //user.onclick=function(fullName){console.log('hello')};
        user.innerHTML = '' + fullName + '<br>' + data[i].email;
        user.id = 'messenger' + i;
        user.className += 'list-group-item d-flex justify-content-between align-items-center';
        OnlineLogo.className = 'onlineLogo';
        OnlineLogo.id = 'onlineLogo' + i;
        OnlineLogo.style.backgroundColor = 'red';
        OnlineLogo.style.height = '15px';
        OnlineLogo.style.width = '15px';
        OnlineLogo.style.borderRadius = '50%';
        if (data[i].isOnline == 1)
            OnlineLogo.style.backgroundColor = 'green';
        emailToUSerId[data[i].email] = i;
        $('#messengers').append(user);
        user.append(OnlineLogo);

    }
}

$(document).ready(function () {
    $('#msg_text').focus();
    setprofile();
    getUserList();

    let myScript = document.createElement("script");
    myScript.setAttribute("src", "./js/socket.js");
    document.body.appendChild(myScript);
});