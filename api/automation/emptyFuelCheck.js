var userProfile = require('../userProfile');
module.exports = emptyFuelCheck;

setInterval(function() {
    emptyFuelCheck();
}, 300000);

function emptyFuelCheck() {
    var params;
    userProfile.scan(null, function(err, results) {
        if (!err && results) {
            results.forEach(function(val) {
                if (val.fuel === 0) {
                    params = {
                        username: val.username,
                        fuel: '1'
                    };
                    userProfile.updateFuel(params, function() {});
                }
            });
        }
    });
}
