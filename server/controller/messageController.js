const getConversationModel = require('../models/conversation');

const messageController = (req, res) => {
    const { conversation_id, msgId, msg, msg_type, isSeen, sender_id, receiver_id, userEmail } = req.body;

    const consversationObj = {
        msgId: msgId,
        msg: msg,
        msgType: msg_type,
        isSeen: isSeen,
        sender_id: sender_id,
        receiver_id: receiver_id
    };
    var consversation;
    consversation = new getConversationModel(conversation_id, userEmail)(consversationObj);
    consversation.save((err, result) => {
        if (err) {
            console.log(err);
            res.send('msg-Not-send');
        }
        else {
            console.log(result);
            res.send('msg-send');
        }
    })

}

module.exports = messageController;