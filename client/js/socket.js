
const socket = io();
console.log('here1');
var username = getCookie("username");
console.log(username);
socket.emit('user-join', username);
socket.on('user-list', (users) => {
    users.forEach(i => {
        $('#user-list').append($('<li>').text(i));
    });
    // $('#user-list').append($('<li>').text())
})
socket.on('msg',({username,msg})=>{
    $('#msg-list').append($('<li  class ="left">').text(msg));
})
// function sendMsg(){
//     var msg = document.getElementById('textMsg').value;
//     if(msg!=''){
//         console.log(msg);
//         socket.emit('msg',{username,msg});
//         $('#msg-list').append($('<li  class ="right">').text(msg));
//         document.getElementById('textMsg').value='';
//     }
// };
