var ports = require('../port');

module.exports = buy;

function buy(user, callback) {
    var amount = parseInt(user.arg[0]);
    ports.getPort(user.profile, function(err, portData) {
        if (!portData) {
            return callback({
                error: 'No port in this sector',
                code: 'invalidPort'
            });
        } else {
            console.log(user, portData);
            if (!portData.sell) {
                return callback({
                    error: 'This port does not sell',
                    code: 'notBuyPort'
                });
            } else if (amount * portData.price > user.profile.currency) {
                return callback({
                    error: 'Not enough money. Required: $' + (amount * portData.price).toFixed(2) + ' | Current: $' + parseInt(user.profile.currency).toFixed(2),
                    code: 'insufficientFunds'
                });
            } else if (amount > portData.currentStock) {
                return callback({
                    error: 'Insufficient stock. Available stock: ' + portData.currentStock,
                    code: 'insufficientStock'
                });
            }
            else  if (portData.sell === 'fuel' && amount > (user.profile.maxFuel - user.profile.fuel)){
                return callback({
                    error: 'Insufficient fuel holds. Available fuel capacity: ' + (user.profile.maxFuel - user.profile.fuel),
                    code: 'insufficientStock'
                });
            }

            return callback(null, 'sdf');
        }
    });

}
