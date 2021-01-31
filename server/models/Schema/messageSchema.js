const { Schema } = require("mongoose");

const messageSchema = new Schema({
    room:  { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    message_body: String,
    message_status:{type: Boolean, default: false},
    is_seen:{type: Boolean, default: false},
    is_delievered:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});

module.exports = messageSchema;