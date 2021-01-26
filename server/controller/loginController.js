var User = require("../models/user.js");

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log(req.body);

        var user = await User.findOne({ email }).exec((err, user) => {
            if (err || !user) {
                //console.log("error " + err);
                return res.send({ msg: 'No user found!' });
            }
            else if (!user.authenticate(password)) {
                console.log(password);
                return res.send({ msg: "Invalid Password" });
            }
            else {
                // set cookies in response header
                console.log(user._id);
                res.cookie('user_id', user._id, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 });
                // res.cookies('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });

                // session updating
                //req.session.user_id = user._id;
                console.log('Upto Here1');
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