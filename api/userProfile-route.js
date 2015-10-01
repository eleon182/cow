var express = require('express');
var debug = require('debug')('main');
var lo = require('lodash');
var router = express.Router();

var userProfile = require('./userProfile');
var navigation = require('./navigation');

router.get('/getUser', function(req, res, next) {
    userProfile.getUser(req.headers, function(err, data) {
        if (err) {
            res.status(500).send({
                code: 'notFound',
                error: 'User not found',
                message: err
            });
        } else {
            res.send(data);
        }
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
        userProfile.getUser(req.body, function(err, data) {
            if (err) {
                res.status(500).send({
                    code: 'notFound',
                    error: 'User not found',
                    message: err
                });
            } else {
                if (lo.indexOf(navigation.getAdjacent(data.sector), parseInt(req.body.sector)) > -1) {
                    userProfile.updateSector(req.body, function(err, data) {
                        if (err) {
                            res.status(500).send({
                                code: 'notFound',
                                error: 'User not found',
                                message: err
                            });

                        } else {
                            userProfile.getUser(req.body, function(err, data) {
                                res.send(data);
                            });
                        }
                    });
                } else {
                    res.status(500).send({
                        code: 'notAdjacent',
                        error: 'Sector is not adjacent',
                    });
                }
            }
        });
    }
});
module.exports = router;
