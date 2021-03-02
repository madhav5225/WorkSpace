
const { generateKey, sha256 } = require("../Encryption.js/encryption");
const { userModel } = require("../models/db_model");

const loginController = async (req, res) => {
    try {

        const { email} = req.body;
        const password=req.body.password;

        await userModel.findOne({ email }).exec(async (err, user) => {
            if (err || !user) {
                return res.send({ msg: 'No user found!' });
            }
            else if (!user.authenticate(password)) {
                return res.send({ msg: "Invalid Password" });
            }
            else {
                // session updating
                req.session.user = user;
                req.session.passPhrase= await sha256(email + password);
                res.send({ msg: "success" });
            }
        });
    }
    catch (error) {
        res.send({ msg: error });
    }
}

module.exports = loginController;