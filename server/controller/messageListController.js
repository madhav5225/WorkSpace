//isOnline = require('./../userInfo');

const messageListController = async (req, res) => {

    var conversation_id = req.query.conversation_id;
    console.log(conversation_id);

    console.log('req.body.conversationId');

    //res.send('aagya');
    const Message = require("../models/conversation.js")(conversation_id,"invalidEmail");
    await Message.find({}).then(cursor => {
        // console.log(cursor);
        var messages = [];
        cursor.forEach(message => {
            var obj = {};
            //  console.log(user._id+" :: "+current_user_id);
            obj = {
                msgId:message.msgId,
                msg:message.msg,
                msgType:message.msg_type,
                isSeen:message.isSeen,
                sender_id:message.sender_id,
                receiver_id:message.receiver_id,
                sendAt:message.sendAt,
                recievedAt:message.recievedAt,
            };

            console.log(obj);
            messages.push(obj);
        });
        res.send(messages);
    });
}

module.exports = messageListController;