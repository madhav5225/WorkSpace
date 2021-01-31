var mongoose = require('mongoose');
const messageSchema = require('./message');
// our schema 

var consversation = {};
var consversationUndelivered = {};

exports.getConversationModel=(conversation_id)=> {
    
   
      console.log('Collection object of delivered conversation is made');
    if (!consversation[conversation_id]) {
        consversation[conversation_id] = new mongoose.model(conversation_id, messageSchema, conversation_id);
    }
    return consversation[conversation_id];
}
exports.getConversationModelUndelivered= (conversation_id)=> {
    console.log('Collection object of Undelivered conversation is made');
  // console.log(conversation_id);
   
    if (!consversationUndelivered[conversation_id]) {
        consversationUndelivered[conversation_id] =
            new mongoose.model
                (conversation_id + 'undelivered', messageSchema, conversation_id + 'undelivered');
    }
    return consversationUndelivered[conversation_id];
}