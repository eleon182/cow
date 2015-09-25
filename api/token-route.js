var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var token = require('./token');

router.post('/create', function(req, res, next) {
    token.create(req.body).then(
        function(val) {
            res.send(val);
        },
        function(err) {
            res.status(404).send({
                code: 'invalidCredentials',
                error: 'Invalid Credentials'
            });

        });
});

router.get('/validate', function(req, res, next) {
    token.validate(req.body).then(
        function(val) {
            res.send(val);
        },
        function(err) {
            res.status(404).send({
                code: 'invalidCredentials',
                error: 'Invalid Credentials'
            });

        });
});

module.exports = router;
