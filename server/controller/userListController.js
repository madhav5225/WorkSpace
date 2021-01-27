const User = require("../models/user");

const userListController = async (req,res)=>{

    const current_user_id = req.session.user._id;
    await User.find({ }).then(cursor=>{
        // console.log(cursor);
         const users=[];
        cursor.forEach(user=> 
         {
             var obj={};
            //  console.log(user._id+" :: "+current_user_id);
            if(user._id==current_user_id)
            {
              obj={currentUser:true,
                 fname:user.name.first,
                 lname:user.name.last,
                 email:user.email
                  };
            }
            else
            {
             obj={currentUser:false,
                 fname:user.name.first,
                 lname:user.name.last,
                 email:user.email
                  };
           }
             users.push(obj);
         });
         res.send(users);
     });
}

module.exports = userListController;