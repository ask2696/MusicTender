var songsLib = require('./../lib/song.lib');

module.exports.index = function(req, res) {  
    // Get Upcoming Songs Promise
    var upComingSongsPromise = songsLib.getUpcomingSongsPromise();
    upComingSongsPromise.then(function(upcomingSongs) {
        res.render('index', {
            'upcomingSongs': upcomingSongs,
        });
    }).catch(function(err) {
        console.log(err);
    });
};
