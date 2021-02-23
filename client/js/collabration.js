

$('#collabrativeArea').keypress((e) => {
    var character = String.fromCharCode(e.charCode);
    currentUserCursor = $('#collabrativeArea').prop("selectionStart");
   
    console.log(character);
    console.log(currentUserCursor);
       
    if (friendUserCursor > currentUserCursor) {
        friendUserCursor++;
    }
    th++;
    currentUserCursor++;
    socket.emit('Collabrative-Insert-from-Client',
        { character, 'friendUserId': friendUser.id,th });
   
})
$('#collabrativeArea').keyup((e) => {
    //console.log(e.which);
    //console.log($('#collabrativeArea').prop("selectionStart"));
    if (e.which == 37||e.which == 38||e.which == 39||e.which == 40 ) {
        currentUserCursor = $('#collabrativeArea').prop("selectionStart");
        console.log(currentUserCursor);
       th++;
        socket.emit('Collabrative-Set-Pointer-from-Client',
            { currentUserCursor, 'friendUserId': friendUser.id ,th});
           
    }

})

$('#collabrativeArea').click( e => {
    th++
    document.getElementById("collabrativeArea").disabled = true;
    currentUserCursor = document.getElementById('collabrativeArea').selectionStart;
    document.getElementById("collabrativeArea").disabled =false;
    $('#collabrativeArea').focus();
    
    console.log(currentUserCursor);
    socket.emit('Collabrative-Set-Pointer-from-Client',
        { currentUserCursor, 'friendUserId': friendUser.id,th });

})