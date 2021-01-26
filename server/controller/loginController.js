var User = require("../models/user.js");

const loginController = async (req, res) => {
    try {
        
        const {email,password} = req.body;

        console.log(req.body);
        
        var user= await User.findOne({email}).exec((err,user)=>{
            if (err||!user ) {
                //console.log("error " + err);
                return res.send({ msg: 'No user found!' });
            }
            else if (!user.authenticate(password)) {
                console.log(password);
                return res.send({ msg: "Invalid Password" });
            }
            // set cookies in response header
            else
            {
            console.log(user.name);
            // res.cookie('username',user.name.first, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });
             res.cookie('data',{name:user.name,email:user.email} , { httpOnly: false, maxAge: 7 * 24 * 60 * 60 });
            // session updating
            req.session.user = user;
            res.send({ msg: "success" });
            }
        });   
    }
    catch (error) {
        console.log(error);

        res.send({ msg: error });
    }
}

module.exports = loginController;