function registerRequest() {

    //Retrieving Value
    const email = $('#email_reg').val();
    const password = $('#password_reg').val();
    const name = $('#name_reg').val();
    $.post("/register", { email, name, password }, function (data) {
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
