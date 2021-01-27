function sendMsg(event) {

    event.preventDefault();

    var msg = $('#msg_text').val();
    console.log(msg);
    if (msg != '') {
        if ($('#before_conversation').is(':visible')) {
            $('#chat_ul').show();
            $('#before_conversation').hide();
        }
        $('#chat_ul').append($('<li class="left  message-box">').text(msg));

        $('#msg_text').val('');
    }

}
function  setMessengers(data)
{
    for(var i=0;i<data.length;i++){
       // console.log(data[i].currentUser);
        if(data[i].currentUser==1)
        continue;
    var user = document.createElement('li');
    user.innerHTML = ''+data[i].fname+' '+data[i].lname+'<br>'+data[i].email;
    user.id=''+i;
    user.className+='list-group-item d-flex justify-content-between align-items-center';

    document.getElementById('messenagers').appendChild(user);
    }
}
$(document).ready(function(){
    $.get('/profile',function(data){
        // console.log(data);   
       setMessengers(data);
    })
});