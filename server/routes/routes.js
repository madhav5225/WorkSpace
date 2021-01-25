const express = require('express');
const mongoose=require('mongoose');
var User = require("../models/user.js");
const router = express.Router();

router.post('/login',async (req,res)=>{
    console.log('hello Old USer'+req.body.email);
    console.log('hello Old USer'+req.body.password);
    
    const user=await User.findOne(
        { "email": ''+req.body.email,
          "password": ''+req.body.password  
         }
        ).exec();
        if(user) {
            console.log('true1');
            console.log(user);
            
            //res.json({ user: 'tobi' });
            res.end();
            
        }
        else {
            console.log('false1');
            res.send('false');
        }
  });

module.exports = router;