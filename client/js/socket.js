const socket = io();
console.log(currentUser.email);

 socket.emit('new-user-joined',currentUser.email);
 socket.on('set-this-active',email=>{
  //   console.log('UptoHere3');
//console.log(idOfOnlineLogo[email]);
document.getElementById('onlineLogo'+idOfOnlineLogo[email]).style.backgroundColor='green';
 });
 socket.on('set-this-inactive',email=>{
  //   console.log('UptoHere3');
//console.log(idOfOnlineLogo[email]);
document.getElementById('onlineLogo'+idOfOnlineLogo[email]).style.backgroundColor='red';
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
