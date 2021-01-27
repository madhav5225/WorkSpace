
const dashBoardController =  (req, res) => {
    
    res.sendFile('/dashboard.html', { root: 'client' });

}
module.exports = dashBoardController;