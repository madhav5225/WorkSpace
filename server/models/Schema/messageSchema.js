const mongoose= require("mongoose");

const messageSchema = new mongoose.Schema({
    id: Number,
    room_id: String,
    sender_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    message_body: String,
    message_type: String,
    is_seen:{type: Boolean, default: false},
    is_recieved:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

module.exports = messageSchema;