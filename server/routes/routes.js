const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user)
        return res.redirect('/dashboard');
    res.sendFile('/home.html', { root: 'client' });

})

// login route
router.post('/login', require('../controller/loginController'));

// register route
router.post('/register',require('../controller/registerController'));

// dashBoard route
router.get('/dashboard', require('../controller/dashBoardController'));
module.exports = router;