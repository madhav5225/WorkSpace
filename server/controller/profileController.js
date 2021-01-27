const User = require('../models/user');
const profileController = (req, res) => {
    //console.log(user_id);
    await User.find({ }).then(cursor=>{
       // console.log(cursor);
        const users=[];
       cursor.forEach(user=> 
        {
            var obj={};
           if(user._id==current_user_id)
           {
             obj={currentUser:1,
                fname:user.name.first,
                lname:user.name.last,
                email:user.email
                 };
           }
           else
           {
            obj={currentUser:0,
                fname:user.name.first,
                lname:user.name.last,
                email:user.email
                 };
          }
            users.push(obj);
        });
        res.send(users);
    });       
        //print(tojson(myCursor.next()));        
}
module.exports = profileController;
