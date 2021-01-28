var currentUser;
var userList;
var idOfOnlineLogo = [];

function generateConversationID(a,b){
    return (parseInt(a,16)+parseInt(b,16)).toString(16);
}
function sendMsg(event) {

    event.preventDefault();

    var msg = $('#msg_text').val();
    console.log(msg);
    if (msg != '') {
        if ($('#before_conversation').is(':visible')) {
            $('#chat_ul').show();
            $('#before_conversation').hide();
        }
        ($('<li class="left  message-box">').text(msg)).appendTo('#chat_ul');
        const conversation_id = generateConversationID(currentUser._id,userList[0].id);
        $.post('/sendMsg',
            {
                conversation_id: conversation_id,
                msg: msg,
                msg_type: "txt",
                sender_id: currentUser._id,
                receiver_id: userList[0].id
            })
        // $('#chat_ul').animate({scrollTop: $last.offset().top}, 500);        
    }

    $('#msg_text').val('').focus();

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
    })
}

function setMessengers(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].currentUser == true)
            continue;
        var user = document.createElement('li');
        var OnlineLogo = document.createElement('span');

        user.innerHTML = '' + data[i].fname + ' ' + data[i].lname + '<br>' + data[i].email;
        user.id = '' + i;
        user.className += 'list-group-item d-flex justify-content-between align-items-center';
        OnlineLogo.className = 'onlineLogo';
        OnlineLogo.id = 'onlineLogo' + i;
        OnlineLogo.style.backgroundColor = 'red';
        OnlineLogo.style.height = '15px';
        OnlineLogo.style.width = '15px';
        OnlineLogo.style.borderRadius = '50%';
        if (data[i].isOnline == 1)
            OnlineLogo.style.backgroundColor = 'green';
        idOfOnlineLogo[data[i].email] = i;
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