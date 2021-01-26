var User = require("../models/user.js");

const registerController = async (req, res) => {
    try {

        const { email, name, password } = req.body;

        console.log(req.body);

        await User.findOne({ email }).exec((err, user) => {
            if (err) {
                console.log("error " + err);
                return res.send({ msg: err });
            }
            else if (user) {
                return res.send({ msg: "Already Registered" });
            }
            else {
                const user = new User({
                    email: email,
                    fullname: name,
                    password: password
                });

                user.save((err, user) => {
                    if (err) {
                        console.log('Save error ' + err.message);
                        return res.send('Error connecting Database');
                    } else {

                        res.cookie('user_id', user._id, { signed:true,
                            httpOnly: true, maxAge: 24 * 60 * 60*1000 });
                        // req.session.user_id = user._id;
                        res.send({ msg: "success" });

                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);

        res.send({ msg: error });
    }
}

module.exports = registerController;