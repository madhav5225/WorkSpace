var mongoose = require('mongoose');
const messageSchema = require('./message');
const isOnline = require('../userInfo');
// our schema 

var consversation = {};
var consversationUndelivered = {};

function getConversationModel(conversation_id, userEmail) {
    console.log(isOnline);
    console.log(userEmail);

    if (!(userEmail in isOnline))
        return getConversationModelUndelivered(conversation_id);
    console.log('hel1');
    if (!consversation[conversation_id]) {
        consversation[conversation_id] = new mongoose.model(conversation_id, messageSchema, conversation_id);
    }
    return consversation[conversation_id];
}
function getConversationModelUndelivered(conversation_id) {
    console.log('hel2');
    console.log(conversation_id);

    if (!consversationUndelivered[conversation_id]) {
        consversationUndelivered[conversation_id] =
            new mongoose.model
                (conversation_id + 'undelivered', messageSchema, conversation_id + 'undelivered');
    }
    return consversationUndelivered[conversation_id];
}
module.exports = getConversationModel;