var currentUser;
var typing =false;
var timeout = undefined;
var user_id = [];//maps user._id to id
var messageObj=[];//maps user._id to {unseen_msg_count,sender_msg_count,msg_obj} where msg_obj is list of message that user is sending 
//object{id ,room_id,sender_id,message_body,message_type,is_seen,is_recieved,created_at}

const socket = io();

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
           // console.log(name + " " + email);
            $('#profile_name').text(name);
            $('#profile_email').text(email);
            return true;
        }
    }).fail(()=>{
           return false;
    });
}

async function getUserList() {
    await $.get('/usersList', function (data) {
        userList = data;
        setChatList(data);
    })
}

async function setChatList(data) {
    for (var i = 0; i < data.length; i++) {
        var user = data[i];
        user_id[user.id] = i;

        if (user.currentUser == true)
            continue;
 
        var userItem = $('<li class="list-group-item user-list-item d-flex justify-content-between align-items-center"  onclick=setChat(' + i + ')>');

        var name_element = $('<div>').text(user.fname + ' ' + user.lname);
        var email_element = $('<div class="text-muted" style="font-size:smaller">').text(user.email);

        var active;
        if (user.isOnline == true)
            active = $('<span class="onlineIcon online" id="onlineIcon'+i+'">');
        else
            active = $('<span class="onlineIcon" id="onlineIcon'+i+'">');

        userItem.append(name_element);
        userItem.append(email_element);
        userItem.append(active);

        $('.userList').append(userItem);

        const roomObj={
            room_id:generateRoomID(user.id,currentUser._id),
            sender_id:user.id,
            reciever_id:currentUser._id
         };
        await $.post("/messenger", roomObj, function (data) {
            if((data.messages.length- data.senderMessagesCount)!=0)
            socket.emit('successfully-recieve-by-reciever',roomObj);
            messageObj[user.id]=
            {room_id:data.room_id,senderMessagesCount:data.senderMessagesCount,messages:data.messages};
            console.log(data);
        }).fail(function (err) {
            console.log("error: " + err);
        });
         
    }
}

$(document).ready(async function () {
    $('#msg_text').focus();
    try{
    var flag=await setprofile();
    while(flag==false)
    flag=await setprofile();
    await getUserList();
    
    }
    catch(err)
    {
        alert(err);
    }
    let myScript = document.createElement("script");
    myScript.setAttribute("src", "./js/socket.js");
    document.body.appendChild(myScript);
});

