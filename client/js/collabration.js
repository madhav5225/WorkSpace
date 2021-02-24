

$('#collabrativeArea').keypress((e) => {
    var character = String.fromCharCode(e.charCode);
    currentUserCursor = $('#collabrativeArea').prop("selectionStart");
   
    console.log(character);
    console.log(currentUserCursor);
       
    if (friendUserCursor > currentUserCursor) {
        friendUserCursor++;
    }
    socket.emit('Collabrative-Insert-from-Client',
        { characterCode:e.which, 'friendUserId': friendUser.id,currentUserCursor });
        currentUserCursor++;
    
})
$('#collabrativeArea').keyup((e) => {
    console.log(e.which);
    console.log(  String.fromCharCode(e.charCode));
    //position after key is pressed
    currentUserCursor = $('#collabrativeArea').prop("selectionStart");
      
    console.log(currentUserCursor);
    console.log(friendUserCursor);
    
    if (e.which == 37||e.which == 38||e.which == 39||e.which == 40 ) {
        socket.emit('Collabrative-Set-Pointer-from-Client',
            { currentUserCursor, 'friendUserId': friendUser.id });
           
    }

})
$('#collabrativeArea').keydown((e) => {
    console.log(e.which);
    console.log(  String.fromCharCode(e.charCode));
    //position before key is pressed
    currentUserCursor = $('#collabrativeArea').prop("selectionStart");
      
    console.log(currentUserCursor);
    console.log(friendUserCursor);
    
 if(e.which==8 && currentUserCursor!=0)
    {
        currentUserCursor--;
        console.log('delete sent');
        socket.emit('Collabrative-Insert-from-Client',
        { characterCode:e.which, 'friendUserId': friendUser.id,currentUserCursor });
        if (friendUserCursor > currentUserCursor)
            friendUserCursor--;

    }
})
$('#collabrativeArea').click( e => {

    currentUserCursor = document.getElementById('collabrativeArea').selectionStart; 
    console.log(currentUserCursor);
    socket.emit('Collabrative-Set-Pointer-from-Client',
        { currentUserCursor, 'friendUserId': friendUser.id });

})