var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    name: String,
    album: {
        type: Schema.Types.ObjectId,
    },
    artists: [String],
    path: String,
    inQueue: Boolean,
    timeAddedToQueue: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Song', songSchema);
