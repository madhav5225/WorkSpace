var User = require("../models/user.js");

const registerController = async (req, res) => {
    try {

        const { email, name, password } = req.body;

        await User.findOne({ email }).exec((err, user) => {
            if (err) {
                console.log("error " + err);
                return res.status(404).send({ msg: err });
            }
            if (user) {
                return res.status(404).send({ msg: "Already Registered" });
            }
        });

        const user = new User({
            email: email,
            name: name,
            password: password
        });

        await user.save((err, user) => {
            if (err) {
                console.log('Save error' + err.message);
                return res.status(401).send('Error connecting Database');
            } else {

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

module.exports = registerController;