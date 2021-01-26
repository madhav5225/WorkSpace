
const socket = io();
console.log('here1');
 var cookieArray = document.cookie;
 //console.log(decodeURIComponent(cookieArray));
 
//  for(var i=0; i<cookieArray.length; i++) {
//     //name = cookieArray[i].split('=')[0];
//     console.log(decodeURIComponent(cookieArray[i]) );
// }
 socket.emit('user-joined','hello');
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
