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

$(document).ready(function(){
    $.get('/profile',function(data){
        // const {success,name,email}=data;
        // if(success){
        //     console.log(name+" "+email);
        //     sessionStorage.setItem("name", name);
        //     sessionStorage.setItem("email",email);   
        // }
        console.log('here only');
        console.log(data);
    })
});