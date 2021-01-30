const socket = io();

socket.emit('new-user-joined', currentUser.email);
socket.on('set-this-active', email => {
    document.getElementById('onlineLogo' + emailToUSerId[email]).style.backgroundColor = 'green';
});
socket.on('set-this-inactive', email => {
    document.getElementById('onlineLogo' + emailToUSerId[email]).style.backgroundColor = 'red';
});
// socket.on('user-list', (users) => {
//     users.forEach(i => {
//         $('#user-list').append($('<li>').text(i));
//     });
//     // $('#user-list').append($('<li>').text())
// })
// socket.on('msg',({username,msg})=>{
//     $('#msg-list').append($('<li  class ="left">').text(msg));
// })
// // function sendMsg(){
// //     var msg = document.getElementById('textMsg').value;
// //     if(msg!=''){
// //         console.log(msg);
// //         socket.emit('msg',{username,msg});
// //         $('#msg-list').append($('<li  class ="right">').text(msg));
// //         document.getElementById('textMsg').value='';
// //     }
// // };
