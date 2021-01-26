const dashBoardController = (req, res) => {
    let user_id = req.cookies['user_id'];
    console.log(user_id);
    if (user_id === '')
        return res.redirect('/');

    res.sendFile('/dashboard.html', { root: 'client' });

}
module.exports = dashBoardController;