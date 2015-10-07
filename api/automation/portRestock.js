var navigation = require('../json/navigation');
var port = require('../port');
module.exports = portRestock;

setInterval(function() {
    portRestock();
}, 30000);

function portRestock() {
    var newStock;
    var rand = Math.floor(Math.random() * navigation.length - 1) + 1;
    port.getPort({
        sector: rand
    }, function(err, data) {

        if (!err && data) {
            if (data.buy) {
                newStock = data.currentStock - Math.floor(Math.random() * 1000 * (data.currentStock / 2000));
                if (newStock <= 0) {
                    newStock = 1;
                }
            } else if (data.sell) {
                newStock = data.currentStock + Math.floor(Math.random() * 1000 * (2000 / data.currentStock));
                if (newStock <= 0) {
                    newStock = 1;
                }
            }

            port.updatePort({sector: rand, currentStock: newStock}, function(err, data){
            })
        }
    });

}
