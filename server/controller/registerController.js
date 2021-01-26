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
            else{
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
        
                        req.session.user = user;
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