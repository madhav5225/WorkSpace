
const dashBoardController =  (req, res) => {
    if (!req.cookies['user_id'])
        return res.redirect('/');
    
    res.sendFile('/dashboard.html', { root: 'client' });
}
module.exports = dashBoardController;