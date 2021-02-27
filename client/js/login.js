async function sha256(message) {

    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}
function loginRequest() {

    //Retrieving Value
    const email = $('#email_login').val();
    const password = $('#password_login').val();
    CryptoJS.SHA256(password).then(hash => console.log(hash));
    // true if checkbox is checked
    // var rem_login = ($('#rem_login').is(':checked') == "true") ? true : false;
    // console.log(rem_login);
      
    // $.post("/login", { email, password }, function (data) {
    //     if (data['msg'] === "success") {
    //         window.location.href = '/dashboard';
    //     }
    //     else {
    //         alert(data['msg']);
    //     }
    // }).fail(function (data) {
    //     console.log("error: " + data);
    // });
}
