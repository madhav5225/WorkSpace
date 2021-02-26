const express = require('express');
const { check_login, check_not_login } = require('../controller/check_login');
const router = express.Router();

router.get('/', check_not_login, (req, res) => {
  // console.log('request to / is made');
  res.sendFile('/home.html', { root: 'client' });
})

// login route
router.post('/login', require('../controller/loginController'));

// register route
router.post('/register', require('../controller/registerController'));

// send-mail route
router.post('/send_verification', require('../controller/mailVerificationController'));

router.get('/user_activation',require('../controller/activationController'))

// dashBoard route
router.get('/dashboard', check_login, require('../controller/dashBoardController'));

// get profile details
router.get('/profile', check_login, require('../controller/profileController'));

// get All msg of particular conversation
router.get('/roomInfo', check_login, require('../controller/roomController'));

// get user list
router.get('/usersList', check_login, require('../controller/userListController'));

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;