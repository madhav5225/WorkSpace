const jwt = require('jsonwebtoken');
const { userModel } = require("../models/db_model.js");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const mailVerificationController = async (req, res) => {
    try {

        const { email, name, gender, password } = req.body;

        // console.log(req.body);

        await userModel.findOne({ email }).exec((err, user) => {
            if (err) {
                console.log("error " + err);
                return res.send({ msg: err });
            }
            else if (user) {
                return res.send({ msg: "Already Registered" });
            }
            else {

                const token = jwt.sign(
                    {
                        email,
                        name,
                        gender,
                        password
                    },
                    process.env.JWT_ACCOUNT_ACTIVATION,
                    {
                        expiresIn: '30m'
                    });

                const mail = {
                    from: 'jatingarg@mnnit.ac.in',
                    to: email,
                    subject: "WorkSpace Mail Verification",
                    html: `
                        <h1>Please use the following to activate your account</h1>
                        <p>${process.env.CLIENT_URL}/user_activation?token=${token}</p>
                        <hr/>
                    `
                };

                sgMail.send(mail).then(()=>{
                    res.send({msg:"success"});
                }).catch((error)=>{
                    res.send({msg:error});
                })

                // user.save((err, user) => {
                //     if (err) {
                //         console.log('Save error ' + err.message);
                //         return res.send('Error connecting Database');
                //     } else {
                //         req.session.user = user;
                //         res.send({ msg: "success" });
                //     }
                // });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.send({ msg: error });
    }
}

module.exports = mailVerificationController;