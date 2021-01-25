function loginRequest()
{
    //Retrieving Value
    const email=$('#email_login').val();
    const password=$('#password_login').val();

    // true if checkbox is checked
    var rem_login=($('#rem_login').is(':checked')=="true")?true:false;
    console.log(rem_login);
    // if(document.getElementById('rem_login').checked)
    // {
    //     rem_login='true';
    // }


    $.post("/login",{email,password},function(data){
        console.log(data +" :"+ status);
        if(data['success']==="true"){
            // window.location.href = '/dashboard';
        }
        else{
            alert('invalid credentials')
        }

    }).fail(function(data){
        console.log("error: "+data);
    });

}
