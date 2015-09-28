var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var userSecurity = require('./userSecurity');
var token = require('./token');

router.post('/', function(req, res, next) {
    userSecurity.validate(req.body).then(
        function(val) {
            token.create(req.body).then(function(innerVal){
                res.send(innerVal);
            },
            function(err){
                res.status(404).send(err);
            });
        },
        function(err) {
            res.status(404).send(err);

        });
});

module.exports = router;
