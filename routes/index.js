var express = require('express');
var router = express.Router();

// import controllers

var indexController = require('./../controllers/index.controller');

router.get('/', indexController.index);
router.get('/music', function(req, res) {
    res.render('music');
})
module.exports = router;
