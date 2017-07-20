var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    name: String,
    artists: [String],
    path: String,
});

module.exports = mongoose.model('Song', albumSchema);
