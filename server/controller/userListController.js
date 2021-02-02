const { userModel } = require('../models/db_model');
const isOnline = require('../userInfo');

const userListController = async (req, res) => {

    const current_user_id = req.session.user._id;
    await userModel.find({}).then(cursor => {

        const users = [];

        cursor.forEach(user => {

            var obj = {};

            if (user._id == current_user_id) {
                obj = {
                    currentUser: true,
                    id: user._id,
                    fname: user.name.first,
                    lname: user.name.last,
                    email: user.email,
                    isOnline: isOnline[user._id]
                };
            }
            else {
                obj = {
                    currentUser: false,
                    id: user._id,
                    fname: user.name.first,
                    lname: user.name.last,
                    email: user.email,
                    isOnline: isOnline[user._id]
                };
            }

            users.push(obj);
        });

        res.send(users);
    });
}

module.exports = userListController;