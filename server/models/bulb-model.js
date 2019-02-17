const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bulbSchema = new Schema({
    type: String,
    room: String,
    date: String,
    working: {type: Boolean, default: true},
    roomNumber: String //just for simplicity so the room number can be accessed without retriving the room
});

const Bulb = mongoose.model('Bulb', bulbSchema);

module.exports = Bulb;