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
//Ajax Function to send a get request
$.ajax({
    type: "POST",
    url: "http://localhost:5000/login",
    data: { email:""+email,
            password:""+password,
            rem_login:""+rem_login 
           },
    dataType:"jsonp",
    success: function(response){
        //if request if made successfully then the response represent the data
        console.log( 'hello123' );
        console.log( response );
    }
  }).then(res=>console.log( 'hello12' ));
    
    //Making request to server using Ajax
    // const req=new XMLHttpRequest();
    // var validate="false";
    //   console.log(validate);
    // req.onload=function(){  
    // validate=req.responseText;
    // console.log(req.responseText);
    // }; 
    // req.open("POST","http://localhost:5000/login",true);
    // req.setRequestHeader("content-type","application/x-www-form-urlencoded");
    // req.send("email="+email+"&password="+password+"&rem_login="+rem_login);
    
    
    // console.log(validate);

}