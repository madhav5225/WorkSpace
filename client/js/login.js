function loginRequest()
{
    //Retrieving Value
    const email=document.getElementById('login-email').value;
    const password=document.getElementById('login-password').value;
    // true if checkbox is checked
    var rem_login='false';
    if(document.getElementById('rem_login').checked)
    {
        rem_login='true';
    }
    //document.getElementById("myForm").action=
    //alert(email+password+rem_login);
//Ajax Function to send a get request
$.post("http://localhost:5000/login",
        { email:""+email,
        password:""+password,
        rem_login:""+rem_login 
        },
        function(result){
        console.log(result);
        alert('hi');
        }
    ).fail(function(error){
        console.log(error);
        alert('error');
        });

}