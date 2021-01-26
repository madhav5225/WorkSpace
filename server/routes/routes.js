const express = require('express');
const { read } = require('fs');
const user = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {

    try {
        console.log(req.headers.cookie);
        const data = req.headers.cookie.split(';');
        // console.log(data);
        let parsed = {}
        data.forEach(element => {
            element_p = element.split('=')
            parsed[element_p[0].trim()] = element_p[1];
        });
        let user_id = parsed["user_id"];
        if (user_id != '')
            return res.redirect('/dashboard');
    }
    catch (err) {
        res.cookie('user_id','',{maxAge:-1});
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