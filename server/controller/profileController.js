const profileController = (req, res) => {

    res.send({
        success: true,
        name: req.session.user.name.first + ' ' + req.session.user.name.last,
        email: req.session.user.email,
        _id: req.session.user._id
    })

}

module.exports = profileController;