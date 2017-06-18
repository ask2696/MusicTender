var express = require('express'),
    router  = express.Router();

// import controllers

var indexController = require('./../controllers/indexController');

router.get('/', function(req, res){
    res.render('index');
});

router.get('/test', indexController.index);

module.exports = router;