var nav = require('../json/navigation');

module.exports = getAdjacent;

function getAdjacent(sector){
    return nav[parseInt(sector)];
}
