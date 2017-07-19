module.exports.getLoginPage = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/admin/home');
    }
    res.render('admin/admin');
};

module.exports.getHomePage = function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('admin');
    }

    res.render('admin/home');
};
