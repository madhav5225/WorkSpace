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
   // Making Post request 
$.post("http://localhost:5000/login",
        { email:""+email,
        password:""+password,
        rem_login:""+rem_login 
        },
        function(result){
            if(result['success']==='true')
            location.replace("http://localhost:5000/dashboard");
            else
           alert('Invalid Data:Try again');
        }
    );

}
