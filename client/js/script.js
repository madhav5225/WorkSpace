function sendMsg(event) {

    // event.preventDefault();

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

