var async = require('async');
var ports = require('../port');
var common = require('../common');
var userProfile = require('../userProfile');

module.exports = sell;

function sell(user, callback) {
    var amount = parseInt(user.arg[0]);
    ports.getPort(user.profile, function(err, portData) {
        if (!portData || !portData.buy) {
            return callback({
                error: 'No valid buy port in this sector',
                code: 'invalidPort'
            });
        } else {
            if (amount === 0) {
                amount = smartSell(user, portData);
                if (amount.error) {
                    return callback(amount);
                }
            }
            amount = parseInt(amount);

            var checkValid = checkParams(amount, user, portData);
            if (checkValid.error) {
                return callback(checkValid);
            }
            var portParam = {
                sector: user.profile.sector,
                currentStock: parseInt(portData.currentStock) + amount
            };
            var userParam = {
                username: user.username,
                buy: portData.buy,
                amount: parseInt(user.profile[portData.buy]) - amount,
                currency: parseInt(user.profile.currency) + (amount * portData.price),
            };
            if (portData.buy !== 'fuel') {
                userParam.holds = parseInt(user.profile.holds) + amount;
            }

            async.parallel([

                    function(internalCallback) {
                        userProfile.updateGoods(userParam, function(err, data) {
                            internalCallback(err, data);
                        });

                    },
                    function(internalCallback) {
                        ports.updatePort(portParam, function(err, portVal) {
                            internalCallback(null, portVal);
                        });
                    }
                ],
                function(err, response) {
                    callback(err, buildResponse(amount, portData, userParam));
                });
        }
    });

}

function checkParams(amount, user, portData) {
    if (!user.profile[portData.buy] || user.profile[portData.buy] < amount) {
        return {
            error: 'Not enough ' + portData.buy + '. Requested: ' + amount + ' | Current: ' + user.profile[portData.buy],
            code: 'insufficientSupplies'
        };
    } else {
        return {
            error: false
        };
    }
}

function smartSell(user, portData) {
    var amount = user.profile[portData.buy];

    if (!amount) {
        return {
            error: 'Nothing to sell',
            code: 'insufficientInventory'
        };
    }
    if (portData.buy === 'fuel') {
        amount--;
    }
    return amount;
}

function buildResponse(amount, portData, userParam) {
    var totalPrice = common.moneyFormat(parseInt(amount * portData.price));
    var response = 'Sell successful!';
    response += '\n```';
    response += '\nSold ' + amount + ' ' + portData.buy + ' for $' + totalPrice;
    response += '\n```';
    return response;
}
