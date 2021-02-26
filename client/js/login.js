function loginRequest() {

    //Retrieving Value
    const email = $('#email_login').val();
    const password = $('#password_login').val();

    // true if checkbox is checked
    // var rem_login = ($('#rem_login').is(':checked') == "true") ? true : false;
    // console.log(rem_login);

    $.post("/login", { email, password }, function (data) {
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
