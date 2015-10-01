var express = require('express');
var debug = require('debug')('main');
var router = express.Router();

var userProfile = require('./userProfile');

router.get('/getUser', function(req, res, next) {
    userProfile.getUser(req.headers).then(function(data) {
            res.send(data);
        },
        function(err) {
            res.status(500).send({
                code: 'notFound',
                error: 'User not found'
            });
        });
});

router.post('/updateSector', function(req, res, next) {
    if (!req.body.sector) {
        res.status(500).send({
            code: 'missingParameters',
            error: 'Missing Parameters: sector'
        });
    } else {
        req.body.username = req.headers.username;
        userProfile.updateSector(req.body).then(function(data) {
                res.send(data);
            },
            function(err) {
                res.status(500).send({
                    code: 'notFound',
                    error: 'User not found',
                    message: err
                });
            });
    }
});
module.exports = router;
