const express = require('express');
const { read } = require('fs');
const {check_login,check_not_login} = require('../controller/check_login');
const User = require('../models/user');
const router = express.Router();

router.get('/',check_not_login,(req, res) => {
    res.sendFile('/home.html', { root: 'client' });
})

// login route
router.post('/login', require('../controller/loginController'));

// register route
router.post('/register', require('../controller/registerController'));

// dashBoard route
router.get('/dashboard',check_login, require('../controller/dashBoardController'));

// get profile details
router.get('/profile',check_login,require('../controller/profileController'));

// get user list
router.get('/usersList',check_login,require('../controller/userListController'));

router.post('/sendMsg',require('../controller/messageController'));

// logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;