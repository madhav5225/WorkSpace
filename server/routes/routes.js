const express = require('express');
const mongoose=require('mongoose');
var User = require("../models/user.js");
const router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.user)
    return res.redirect('/dashboard');
    
    res.sendFile('/home.html',{root:'client'});
    
 })
router.post('/login',async (req,res)=>{ 
    try{
    const user=await User.findOne(
        { "email": ''+req.body.email,
          "password": ''+req.body.password  
         }
        ).exec();
    
        if(user) {
            console.log('Valid Credentials');
            console.log(user);
            req.session.user = user;
            res.send({success:'true'});
        }
        else {
            console.log('Invalid Credentials');
            res.send({success:'false'});
        }
    }
    catch(error){
        console.log(error);
        
        res.send({success:'false'});
    }
  });
  router.get('/dashboard',(req,res)=>{
    if(!req.session.user)
     return res.redirect('/');
     
     
    console.log(req.session.user);
    res.sendFile('/dashboard.html',{root:'client'});
     
})

module.exports = router;