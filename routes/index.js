var express = require('express'),
    router  = express.Router();

// import controllers

var indexController = require('./../controllers/indexController');

router.get('/', indexController.index);

module.exports = router;