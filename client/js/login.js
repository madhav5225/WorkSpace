function loginRequest()
{
    //Retrieving Value
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    // true if checkbox is checked
    var rem_login='false';
    if(document.getElementById('rem_login').checked)
    {
        rem_login='true';
    }
    //alert(email+password+rem_login);

    //Making request to server using Ajax
    const req=new XMLHttpRequest();
    req.open("POST","http://localhost:4000/login",false);
    req.setRequestHeader("content-type","application/x-www-form-urlencoded");
    req.send("email="+email+"&password="+password+"&rem_login="+rem_login);
}