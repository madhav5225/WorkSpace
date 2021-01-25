var User = require("../models/user.js");

const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();


// login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {

        // check if a user exists or not
        if (err || !user) {
            console.log("error " + err);
            return res.status(404).send({ msg: 'No user found!' });
        }

        //authenticating user
        if (!user.authenticate(password)) {
            console.log(password);
            return res.status(401).send({ msg: "Invalid Password" });
        }

        //generating webtoken
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        // set cookies in response header
        res.cookies('user_id', user._id, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });
        res.cookies('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });

        res.send({ msg: "success" });
    })
});

router.get('/dashboard', (req, res) => {

});


module.exports = router;