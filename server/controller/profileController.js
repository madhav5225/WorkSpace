const User = require('../models/user');

const profileController = async (req, res) => {

    const user_id = req.signedCookies['user_id'];

    console.log(user_id);
    await User.findOne({ _id: user_id }).exec((err, user) => {
        // console.log(user);
        // console.log(user.email+" "+user.name.last);
        res.send({
            success: true,
            email: user.email,
            name: user.name.first+' '+user.name.last
        });
    })

}

module.exports = profileController;