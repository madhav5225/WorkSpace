//isOnline = require('./../userInfo');
const {getConversationModel,getConversationModelUndelivered }= require('../models/conversation');

const messageListController = async (req, res) => {

    var conversation_id = req.query.conversation_id;
    var delivered = req.query.delivered;
    
    console.log('messages of  Cid '+conversation_id+' is sent back to user');
    var Message;
    if(delivered==='delivered')
    Message = getConversationModel(conversation_id);
    else
    Message = getConversationModelUndelivered(conversation_id);
    
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

           // console.log(obj);
            messages.push(obj);
        });
        res.send(messages);
    });
}

module.exports = messageListController;