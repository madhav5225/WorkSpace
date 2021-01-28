var mongoose = require('mongoose');
const messageSchema  = require('./message');
// our schema 

var consversation={};

function getConversationModel(conversation_id){
    if(!consversation[conversation_id]){
        consversation[conversation_id] = new mongoose.model(conversation_id, messageSchema,conversation_id);
    }
    return consversation[conversation_id];
}

module.exports = getConversationModel;