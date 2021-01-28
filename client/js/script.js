var currentUser;
var userList;
var emailToUSerId = [];
function sendMsg(event) {

    event.preventDefault();

    var msg = $('#msg_text').val();
    console.log(msg);
    if (msg != '') {
        if ($('#before_conversation').is(':visible')) {
            $('#chat_ul').show();
            $('#before_conversation').hide();
        }
        let $last = ($('<li class="left  message-box">').text(msg)).appendTo('#chat_ul');
        $('#chat_ul').animate({ scrollTop: $last.offset().top }, 500);
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
         //console.log(userList);   
        setMessengers(data);
        setHoverOnMessengers();
    })
}
function setChatName(name)
{
    console.log(name);
  document.getElementById('chatName').innerHTML=name;
}
function setMessengers(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].currentUser == true)
            continue;
        var user = document.createElement('li');
        var OnlineLogo = document.createElement('span');
        var fullName=data[i].fname + ' ' + data[i].lname;
        user.setAttribute("onclick","setChatName('"+fullName+"');");
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