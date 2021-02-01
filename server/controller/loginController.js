
const { userModel } = require("../models/db_model");

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        await userModel.findOne({ email }).exec((err, user) => {
            if (err || !user) {
                return res.send({ msg: 'No user found!' });
            }
            else if (!user.authenticate(password)) {
                return res.send({ msg: "Invalid Password" });
            }
            else {
                // session updating
                req.session.user = user;
                res.send({ msg: "success" });
            }
        });
    }
    catch (error) {
        res.send({ msg: error });
    }
}

module.exports = loginController;