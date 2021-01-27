exports.check_login = (req,res,next)=>{
    if(req.session.user){
        console.log('user exists: '+req.session.user);
        next();
    }
    else{
        console.log('not logged in');
        res.redirect('/');
    }
}

exports.check_not_login = (req,res,next)=>{
    if(req.session.user){
        res.redirect('/dashboard');
    }
    else{
        console.log('not logged in');
        next();
    }
}

