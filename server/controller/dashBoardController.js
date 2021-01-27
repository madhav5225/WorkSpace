
const dashBoardController =  (req, res) => {
    if (!req.signedCookies['user_id'])
       { console.log('NO user id exist');
           return res.redirect('/');
            }
            console.log('yha pee');
            console.log(req.session.user);
            
    res.sendFile('/dashboard.html', { root: 'client' });
}
module.exports = dashBoardController;