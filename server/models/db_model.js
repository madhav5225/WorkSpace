const mongoose = require('mongoose');
const userSchema = require('./Schema/userSchema');
const roomSchema = require('./Schema/roomSchema');
const messageSchema = require('./Schema/messageSchema');

exports.userModel = mongoose.model('User',userSchema);
exports.roomModel = mongoose.model('Room',roomSchema );
exports.messageModel = mongoose.model('Message', messageSchema);