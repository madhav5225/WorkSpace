const { roomModel } = require('../models/db_model');

const roomController = async (req, res) => {

    var room_id = req.query.room_id;
    var user1 = req.query.user1;
    var user2 = req.query.user2;
    var room = roomModel;

    await room.findOne({ room_id }).exec((err, result) => {
        if (err || !result) {
            const newRoom = new room({ room_id, topic: 'privateChat', users: [user1, user2], messages: [] });
            newRoom.save();
        }
        res.send(result);

    });

}

module.exports = roomController;