const { userModel } = require("../models/db_model.js");

const registerController = async (req, res) => {
    try {

        const { email, name, gender, password,encrypted_private_key,public_key } = req.body;

        await userModel.findOne({ email }).exec((err, user) => {
            if (err) {
                console.log("error " + err);
                return res.send({ msg: err });
            }
            else if (user) {
                return res.send({ msg: "Already Registered" });
            }
            else {
                const User = new userModel({
                    email: email,
                    fullname: name,
                    gender: gender,
                    password: password,
                    encrypted_private_key:encrypted_private_key,
                    public_key:public_key
                });

                User.save((err, user) => {
                    if (err) {
                        console.log('Save error ' + err.message);
                        return res.send({msg:"Error connecting Database"});
                    } else {
                        console.log('success-register');
                        // req.session.user = user;
                        console.log(user);
                        res.send({msg:"success",user:user});
                        console.log('here1');
                    }
                });
            }
        });

        console.log('here2');
    }
    catch (error) {
        console.log(error);
        res.send({ msg: error });
    }
}

module.exports = registerController;