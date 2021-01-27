const currUser;
const userList;
function sendMsg(event) {

    event.preventDefault();

    var msg = $('#msg_text').val();
    console.log(msg);
    if (msg != '') {
        if ($('#before_conversation').is(':visible')) {
            $('#chat_ul').show();
            $('#before_conversation').hide();
        }
        $('#chat_ul').append($('<li class="left  message-box">').text(msg));

        $('#msg_text').val('');
    }

}
function  setMessengers(data)
{
    for(var i=0;i<data.length;i++){
       // console.log(data[i].currentUser);
        if(data[i].currentUser==1)
        continue;
    var user = document.createElement('li');
    user.innerHTML = ''+data[i].fname+' '+data[i].lname+'<br>'+data[i].email;
    user.id=''+i;
    user.className+='list-group-item d-flex justify-content-between align-items-center';

    document.getElementById('messenagers').appendChild(user);
    }
}

function getUserList() {
    $.get('/usersList', function (data) {
        // console.log(data);   
        setMessengers(data);
    })
}

function setMessengers(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].currentUser == true)
            continue;
        var user = document.createElement('li');
        user.innerHTML = '' + data[i].fname + ' ' + data[i].lname + '<br>' + data[i].email;
        user.id = '' + i;
        user.className += 'list-group-item d-flex justify-content-between align-items-center';

        $('#messengers').append(user);
    }
}

$(document).ready(function () {
    setprofile();
    getUserList();
    let script = document.createElement('script');
script.src = './js/socket.js';
document.head.appendChild(script);
});