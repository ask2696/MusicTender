var LocalStrategy = require('passport-local').Strategy;
var adminLib = require('./admin.lib');

var authLogic = function(username, password, done) {
    adminLib.getAdminByusername(username, function(err, admin) {
        if (err) {
            return done(err);
        }

        if (!admin) {
            return done(null, false, {message: 'Invalid login credentials'});
        }

        if (admin.password != password) {
            return done(null, false, {message: 'Invalid login credentials'});
        }
        console.log('Success', admin);
        return done(null, admin);
    });
};

var serislizeUser = function(admin, done) {
    console.log('serializing user');
    done(null, admin.id);
};

var deserializeUser = function(id, done) {
    adminLib.getAdminById(id, function(err, admin) {
        done(err, admin);
    });
};

module.exports.passportAuthInit = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {
        authLogic(username, password, done);
    }));
    passport.serializeUser(function(admin, done) {
        serislizeUser(admin, done);
    });
    passport.deserializeUser(function(id, done) {
        deserializeUser(id, done);
    });
};
