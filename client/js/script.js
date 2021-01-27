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
function setprofile() {
    $.get('/profile', function (data) {
        const { success, name, email } = data;
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
});