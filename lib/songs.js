var Song = require('./../models/Song.model');

module.exports.getUpcomingSongsPromise = function(){
    return Song.find({ inQueue : true}).exec();
}