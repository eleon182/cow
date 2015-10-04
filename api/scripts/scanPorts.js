var common = require('../common');
var table = 'cow-ports';

var params = {
    RequestItems: {
        'cow-ports': {
            Keys: [
                {
                sector: {
                    "S": '3353'
                }
            },

            ]
        }
    }
};
common.db.batchGetItem(params, function(err, results) {
    console.log(err, results);
});
