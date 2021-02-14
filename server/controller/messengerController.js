const { roomModel } = require('../models/db_model');
const messengerController = async (req, res) => {
    roomObj = req.body;
    var unSeenMessages = 0;
    var messages=[];
    var senderMessagesCount = 0;

    // console.log("reciever: " + roomObj.room_id);
    await roomModel.findOne({ room_id: roomObj.room_id }).exec(async (err, room) => {
        if (err || !room) {
            const newRoom = new roomModel({ room_id: roomObj.room_id, topic: 'privateChat', users: [roomObj.sender_id, roomObj.reciever_id], messages: [] });
            newRoom.save();
            return res.send({ room_id: roomObj.room_id, unSeenMessages, senderMessagesCount, messages });

        }
        else {
            messages = room.messages;
            for (var i = messages.length - 1; i >= 0; i--) {
                if ((roomObj.reciever_id == messages[i].sender_id)
                    || (messages[i].sender_id == roomObj.sender_id && messages[i].is_recieved == true)) {
                    break;
                }
                messages[i].is_recieved = true;
            }
            await roomModel.findOneAndUpdate({ room_id: roomObj.room_id },
                {
                    $set:
                    {
                        messages: messages
                    }
                }).exec((err, result) => {
                    // console.log(err);
                    // console.log(result);

                });
            //retrieving the count of unseen messages
            for (var i = messages.length - 1; i >= 0; i--) {
                if ((roomObj.reciever_id == messages[i].sender_id)
                    || (messages[i].sender_id == roomObj.sender_id && messages[i].is_seen == true)) {
                    break;
                }
                unSeenMessages++;
            }

            if (typeof messages != 'undefined') {
                if (messages.length != 0) {
                    if (messages[messages.length - 1].sender_id == roomObj.reciever_id)
                        senderMessagesCount = messages[messages.length - 1].id;
                    else
                        senderMessagesCount = messages.length - messages[messages.length - 1].id;
                }
            }
            res.send({ room_id: roomObj.room_id, unSeenMessages, senderMessagesCount, messages });
        }
    });


}
module.exports = messengerController;