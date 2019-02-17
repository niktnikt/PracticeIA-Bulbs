const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    _id: String, //allows to add custom id
    bulbs: [{ type: Schema.Types.ObjectId, ref: 'Bulb' }],
    number: String
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;