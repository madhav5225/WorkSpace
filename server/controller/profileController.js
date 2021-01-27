const User = require('../models/user');
const profileController = (req, res) => {
    //console.log(user_id);

    res.send({
        success:true,
        name:req.session.user.name.first+' '+req.session.user.name.last,
        email:req.session.user.email
    })
         
}

module.exports = profileController;