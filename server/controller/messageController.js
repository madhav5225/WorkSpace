const getConversationModel = require('../models/conversation');
const conversation = require('../models/conversation');
const messageSchema = require('../models/message');

const messageController = (req,res)=>{
    const {conversation_id , msg, msg_type, sender_id, receiver_id} = req.body;

    const consversation = new getConversationModel(conversation_id)({
        msg:msg,
        msgType:msg_type,
        sender:sender_id,
        receiver:receiver_id
    });

    consversation.save((err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
}

module.exports = messageController;