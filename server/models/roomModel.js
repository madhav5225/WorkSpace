const mongoose = require('mongoose');
const messageModel = require('./messageModel');
const userModel = require('./userModel');

const roomSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [userModel],
    messages: [messageModel],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('room',roomSchema);