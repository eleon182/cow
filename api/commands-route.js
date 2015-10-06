var express = require('express');
var uuid = require('node-uuid');
var debug = require('debug')('main');
var router = express.Router();

var commandParser = require('./commandParser');
var common = require('./common');
var slack = require('./slackApi');

router.post('/', function(req, res, next) {
    commandParser.hub(req.body, function(err, response){
        if(err && err.error){
            res.send('('+req.body.text+') ' + err.error);
        }
        else {
            res.send('('+req.body.text+') ' + response);
        }
    });
});

module.exports = router;
