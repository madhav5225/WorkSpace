const express = require('express');
const mongoose = require('mongoose');
var User = require("../models/user.js");
const router = express.Router();

router.post('/login',(req, res) => {
    console.log('hello')
    const { email, password } = req.body;
    console.log('hello Old USer ' + email);
    console.log('hello Old USer ' + password);

    User.findOne({ email }).exec((err,user)=>{

        if (user) {
            console.log('true1');
            console.log(user);

            res.redirect('/dashboard');
            // res.send({success:"true"});

        }
        else {
            console.log('false1');
            res.send({success:"false"});
        }
    });
    
});


module.exports = router;