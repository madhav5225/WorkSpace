const express = require('express');
const { read } = require('fs');
const user = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {

    try {
        //console.log(req.cookies['user_id']);
        var user_id = req.cookies['user_id'];
        console.log(user_id);
        if (user_id!=undefined)
            return res.redirect('/dashboard');
    }
    catch (err) {
        //res.cookie('user_id','',{maxAge:-1});
        console.log(err);
    }
    
    res.sendFile('/home.html', { root: 'client' });

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