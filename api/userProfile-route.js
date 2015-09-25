var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var userProfile = require('./userProfile');

router.get('/getUser', function(req, res, next) {
    userProfile.getUser(req.headers).then(function(data){
        res.send(data);
    },
    function(err){
        res.status(500).send({
            code: 'notFound',
            error: 'User not found'
        });
    });
});

module.exports = router;
