module.exports.getLoginPage = function(req, res) {
    res.render('admin/index');
};

module.exports.getHomePage = function(req, res) {
    res.send('Welcome Home');
};
