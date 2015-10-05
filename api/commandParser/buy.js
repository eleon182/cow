var ports = require('../port');

module.exports = buy;

function buy(data, callback) {
    ports.getPort(data.profile, function(err, results) {
        if (!results) {
            return callback({
                error: 'No port in this sector',
                code: 'invalidPort'
            });
        } else {
            console.log(results, data);
            var buy = false;
            for (var key in results) {
                if (results[key] === 'b') {
                    buy = true;
                }
            }
            if (!buy) {
                return callback({
                    error: 'This port only sells',
                    code: 'notBuyPort'
                });
            }
            return callback(null, 'sdf');
        }
    });

}
