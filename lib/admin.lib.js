var Admin = require('./../models/Admin.model');

module.exports.getAdminByusername = function(username, callback) {
    Admin.findOne({username: username}, callback);
};

module.exports.getAdminById = function(id, callback) {
    Admin.findById(id, callback);
};
