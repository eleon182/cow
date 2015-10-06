var lo = require('lodash');

function removeKey(data) {
    if (!lo.isArray(data)) {
        removeIndividualKey(data);
    } else {
        data.forEach(function(outer) {
            for (var key in outer) {
                for (var innerKey in outer[key]) {
                    if (isNaN(outer[key][innerKey])) {
                        outer[key] = outer[key][innerKey];
                    } else {
                        outer[key] = parseInt(outer[key][innerKey]);
                    }
                }
            }
        });
    }
}

function removeIndividualKey(data) {
    for (var key in data) {
        for (var innerKey in data[key]) {
            if (isNaN(data[key][innerKey])) {
                data[key] = data[key][innerKey];
            } else {
                data[key] = parseInt(data[key][innerKey]);
            }
        }
    }
}

module.exports = {
    removeKey: removeKey
};
