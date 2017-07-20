var express = require('express');
var router = express.Router();
var passport = require('passport');
var adminController = require('./../controllers/admin.controller');

router.get('/', adminController.getLoginPage);

router.post('/',
    passport.authenticate('login',
        {
            successRedirect: '/admin/home',
            failureRedirect: '/admin',
            failureFlash: true,
        }),
        function(req, res) {}
);

router.get('/home', adminController.getHomePage);

module.exports = router;
