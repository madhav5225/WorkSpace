function loginRequest() {

    //Retrieving Value
<<<<<<< HEAD
    const email=$('#email_login').val();
    const password=$('#password_login').val();

    // true if checkbox is checked
    var rem_login=($('#rem_login').is(':checked')=="true")?true:false;
    console.log(rem_login);
    // if(document.getElementById('rem_login').checked)
    // {
    //     rem_login='true';
    // }
=======
    const email = $('#email_login').val();
    const password = $('#password_login').val();
>>>>>>> 294f2140acc52ffc895c9949e4cd5500e996329f

    // true if checkbox is checked
    var rem_login = ($('#rem_login').is(':checked') == "true") ? true : false;
    console.log(rem_login);

    $.post("/login", { email, password }, function (data) {
        console.log(data + " :" + status);
        if (data['msg'] === "success") {
            window.location.href = '/dashboard';
        }
        else {
            alert(data['msg']);
        }

    }).fail(function (data) {
        console.log("error: " + data);
    });
}
