const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    room: room,
    user: user,
    message_body: String,
    message_status:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

new mongoose.Schema(
    {
        msgId: {
            type: Number,
            required: true
        },
        msg: {
            type: String,
            trim: true,
            required: true
        },
        msgType: {
            type: String,
            default: "txt"
        },
        isSeen: {
            type: Number,
            required: true
        },
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        sendAt: { type: Date ,default:Date.now, index:true ,require:true },
        receivedAt: { type: Date }
    },
    {
        autoCreate:true,
    }
);

module.exports = mongoose.model('message',messageSchema);