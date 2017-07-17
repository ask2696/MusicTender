var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var songSchema = new Schema({
    name : String,
    album : {
        name : String,
        artists : [String]
    },
    artists : [String],
    path : String,
    inQueue : Boolean,
    timeAddedToQueue : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Song', songSchema);