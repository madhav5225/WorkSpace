const profileController = (req, res) => {

    if (!req.params.id)
        res.send({
            success: true,
            name: req.session.user.name.first + ' ' + req.session.user.name.last,
            email: req.session.user.email,
            _id: req.session.user._id
        })
    else {
        var email = req.params.id;
        console.log(email);
        res.sendFile('/profile.html', { root: 'client' });
    }

}

module.exports = profileController;