const User = require("../models/user");

exports.check_login = (req, res, next) => {
    if (req.session.user) {
        console.log('user exists: ' + req.session.user);
        next();
    }
    else {
        console.log('user is not logged in');
        res.redirect('/');
    }
}

exports.check_not_login = (req, res, next) => {
    if (req.session.user) {
        console.log('user: ' + req.session.user.email + ' already logged in so redirecting to /dashboard ');
        res.redirect('/dashboard');
    }
    else {
        console.log('user not logged in');
        next();
    }
}


