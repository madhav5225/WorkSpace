var currentUser;
var typing = false;
var timeout = undefined;
var user_id = [];
const socket = io();
var currentUserCursor = 0, friendUserCursor=0;

function generateRoomID(a, b) {
    const k1 = parseInt(a, 16);
    const k2 = parseInt(b, 16);
    const y = (((k1 + k2) * (k1 + k2 + 1)) / 2) + (k1 * k2);
    return y.toString(16);
}

async function setprofile() {
    await $.get('/profile', function (data) {
        const { success, name, email } = data;
        currentUser = {
            _id: data._id,
            name: data.name,
            email: data.email,
        };
        if (success) {
            console.log(name + " " + email);
            // $('#profile_name').text(name);
            // $('#profile_email').text(email);
            return true;
        }
    }).fail(() => {
        return false;
    });
}

async function getUserList() {
    await $.get('/usersList', function (data) {
        userList = data;
        setChatList(data);
    })
}

function setChatList(data) {
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        user_id[user.id] = i;

        if (user.currentUser == true)
            continue;
        let userItem;
        if (user.isOnline == true) {
            userItem = $('<li class="user-active" onclick=setChat(' + i + ') id="messenger' + i + '">');
        }
        else {
            userItem = $('<li onclick=setChat(' + i + ') id="messenger' + i + '">');
        }
        var img_element = $('<img src="../resources/defaultProfile.jpg">');
        // var userItem = $('<li class="list-group-item user-list-item d-flex justify-content-between align-items-center"  onclick=setChat(' + i + ') id="messenger'+i+'">');

        var detail_element = $('<div class="userdetails">');
        var name_element = $('<div class="name">').text(user.fname + ' ' + user.lname);
        var email_element = $('<div class="email">').text(user.email);

        detail_element.append(name_element);
        detail_element.append(email_element);

        var stared_element;
        // if(user.is_starred)
        stared_element = $('<div class="starred">').html('<i class="far fa-star"></i>');
        var notify_element = $('<div class="notifycount">');


        userItem.append(img_element);
        userItem.append(detail_element);
        userItem.append(stared_element);
        userItem.append(notify_element);

        $('.userlist-ul').append(userItem);
        const roomObj = {
            room_id: generateRoomID(user.id, currentUser._id),
            sender_id: user.id,
            reciever_id: currentUser._id

        };
        socket.emit('successfully-recieve-by-reciever', roomObj);

    }
}

$(document).ready(async function () {
    $('#msgField').focus();
    try {
        var flag = await setprofile();
        while (flag == false)
            flag = await setprofile();
        await getUserList();

    }
    catch (err) {
        alert(err);
    }
    let myScript = document.createElement("script");
    myScript.setAttribute("src", "./js/socket.js");
    document.body.appendChild(myScript);
});

