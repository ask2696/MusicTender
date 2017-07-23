module.exports.getLoginPage = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/admin/home');
        return;
    }
    res.render('admin/index');
};

module.exports.getHomePage = function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/admin');
        return;
    }
    res.render('admin/home');
};
