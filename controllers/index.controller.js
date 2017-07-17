var songsLib = require('./../lib/songs');

exports.index = function(req, res){  
    var upComingSongsPromise = songsLib.getUpcomingSongsPromise(); //Get Upcoming Songs Promise
    upComingSongsPromise.then(function(upcomingSongs){
        res.render('index', {
            'upcomingSongs' : upcomingSongs
        });
    }).catch(function(err){
        console.log(err);
    })
}