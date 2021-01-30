var currentUser;
var friendUser;
var userList;
var messageList = {};
var unDeliveredList = {};
var deliveredButNotSeen = {};
var emailToUserId = [];

function generateConversationID(a, b) {
    const k1 = parseInt(a, 16);
    const k2 = parseInt(b, 16);
    const y = (((k1 + k2) * (k1 + k2 + 1)) / 2) + (k1 * k2);
    return y.toString(16);
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
        userList = data;
        setChatList(data);
    })
}

function setChatList(data) {
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        emailToUserId[user.email] = i;

        if (user.currentUser == true)
            continue;
 
        var userItem = $('<li class="list-group-item user-list-item d-flex justify-content-between align-items-center"  onclick=setChat(' + i + ')>');

        var name_element = $('<div>').text(user.fname + ' ' + user.lname);
        var email_element = $('<div class="text-muted" style="font-size:smaller">').text(user.email);

        var active;
        if (user.isOnline == 1)
            active = $('<span class="onlineIcon active" id="onlineIcon'+i+'">')
        else
            active = $('<span class="onlineIcon" id="onlineIcon'+i+'">')


        userItem.append(name_element);
        userItem.append(email_element);
        userItem.append(active);

        $('.userList').append(userItem);

        
        
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