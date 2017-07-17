var express = require('express'),
    router  = express.Router();

// import controllers

var indexController = require('./../controllers/index.controller');

router.get('/', indexController.index);

module.exports = router;