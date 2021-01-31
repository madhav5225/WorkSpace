const User = require('../models/db_model');
// isOnline = require('./../userInfo');

const userListController = async (req, res) => {
    
    const current_user_id = req.session.user._id;
    await User.find({}).then(cursor => {
        // console.log(cursor);
        const users = [];
        cursor.forEach(user => {
            var obj = {};
            //  console.log(user._id+" :: "+current_user_id);
            if (user._id == current_user_id) {
                obj = {
                    currentUser: true,
                    id: user._id,
                    fname: user.name.first,
                    lname: user.name.last,
                    email: user.email,
                    isOnline: user.state.online
                };
            }
            else {
                obj = {
                    currentUser: false,
                    id: user._id,
                    fname: user.name.first,
                    lname: user.name.last,
                    email: user.email,
                    isOnline: user.state.online
                };
            }
            users.push(obj);
        });
        res.send(users);
    });
}

module.exports = userListController;