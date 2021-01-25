const express = require('express');``
var User = require("../models/user.js");
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user)
        return res.redirect('/dashboard');

    res.sendFile('/home.html', { root: 'client' });

})

router.get('/dashboard', (req, res) => {
    if (!req.session.user)
        return res.redirect('/');

    console.log(req.session.user);
    res.sendFile('/dashboard.html', { root: 'client' });

})

// login route
router.post('/login', require('../controller/loginController'));

// register route
router.post('/register',require('../controller/registerController'));

module.exports = router;