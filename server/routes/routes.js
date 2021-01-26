const express = require('express');
const { read } = require('fs');
const User = require('../models/user');
const router = express.Router();

router.get('/', async(req, res) => {

    try {
        //console.log(req.cookies['user_id']);
        var user_id = req.signedCookies['user_id'];
        console.log(user_id);
        console.log(req.sessionID);
        await User.findOne({ _id: user_id }).exec((err, user)=>{
            if(err||!user)
            {   res.cookie('user_id', '', { maxAge: -1 });
                res.sendFile('/home.html', { root: 'client' });
            
            }
            else if(user)
            {console.log('hey4');
                return res.redirect('/dashboard');
            }
            
        });
        
    }
    catch (err) {
        //res.cookie('user_id','',{maxAge:-1});
        console.log(err);
    }
    
 
})

// login route
router.post('/login', require('../controller/loginController'));

// register route
router.post('/register', require('../controller/registerController'));

// dashBoard route
router.get('/dashboard', require('../controller/dashBoardController'));

router.get('/profile',require('../controller/profileController'));

router.get('/logout', (req, res) => {
    res.cookie('user_id', '', { maxAge: -1 });
    res.redirect('/');
})

module.exports = router;