const socket = io();
console.log('here1');
var username = getCookie("username");
console.log(username);
<<<<<<< HEAD
socket.emit('user-join', username);
socket.on('user-list', (users) => {
=======
socket.emit('user-join',username);
socket.on('user-list',(users)=>{
>>>>>>> 7901e2b33433bd2618fabdfb65a1f09ca9d2f4bc
    users.forEach(i => {
        $('#user-list').append($('<li>').text(i));
    });
    // $('#user-list').append($('<li>').text())
})
<<<<<<< HEAD
socket.on('msg', ({ username, msg }) => {
    $('#msg-list').append($('<li  class ="left">').text(msg));
})
=======
socket.on('msg',({username,msg})=>{
    $('#msg-list').append($('<li  class ="left">').text(msg));
})
function sendMsg(){
    var msg = document.getElementById('textMsg').value;
    if(msg!=''){
        console.log(msg);
        socket.emit('msg',{username,msg});
        $('#msg-list').append($('<li  class ="right">').text(msg));
        document.getElementById('textMsg').value='';
    }
};
>>>>>>> 7901e2b33433bd2618fabdfb65a1f09ca9d2f4bc
