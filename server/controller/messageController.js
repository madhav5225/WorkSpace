const {getConversationModel,getConversationModelUndelivered }= require('../models/conversation');
const isOnline = require('../userInfo');

const messageController = (req,res)=>{
 
const {conversation_id ,msgId, msg, msg_type,isSeen, sender_id, receiver_id,userEmail} = req.body;
console.log('message: '+msg +' is sent by '+sender_id+' to '+receiver_id);
   const consversationObj={
    msgId:msgId,
    msg:msg,
    msgType:msg_type,
    isSeen:isSeen,
    sender_id:sender_id,
    receiver_id:receiver_id
};
    var consversation;
    if((userEmail in isOnline))
    consversation = new (getConversationModel(conversation_id))(consversationObj);
    else
    consversation = new (getConversationModelUndelivered(conversation_id))(consversationObj);
    
    consversation.save((err,result)=>{
        if(err){
            console.log(err);
            res.send('msg not sent');
        }
        else{
            console.log(result);
            if((userEmail in isOnline))
            res.send('msg is sent to online user');
            else
            res.send('msg is sent to offline user');
        }
    })
    
}

module.exports = messageController;