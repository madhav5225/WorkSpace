const getConversationModel = require('../models/conversation');

const messageController = (req,res)=>{
const {conversation_id ,msgId, msg, msg_type,isSeen, sender_id, receiver_id,userEmail} = req.body;

   const consversationObj={
    msgId:msgId,
    msg:msg,
    msgType:msg_type,
    isSeen:isSeen,
    sender:sender_id,
    receiver:receiver_id
};
    var consversation;
    consversation = new getConversationModel(conversation_id,userEmail)(consversationObj);
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