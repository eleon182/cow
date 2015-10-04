var ports = require('../json/ports');

module.exports = getPort;

function getPort(params, callback){
    return ports[params.port];
}
