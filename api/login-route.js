var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var userSecurity = require('./userSecurity');
var token = require('./token');

router.post('/', function(req, res, next) {
    userSecurity.validate(req.body, function(err, val) {
        if (err) {
            res.status(404).send(err);
        } else {
            token.create(req.body, function(err, innerVal) {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.send(innerVal);
                }
            });
        }
    });
});

module.exports = router;
