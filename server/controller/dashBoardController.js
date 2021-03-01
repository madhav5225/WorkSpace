
const dashBoardController = (req, res) => {
//console.log(req);
console.log(req.session.passPhrase);


    res.sendFile('/dashboard.html', { root: 'client' });

}
module.exports = dashBoardController;