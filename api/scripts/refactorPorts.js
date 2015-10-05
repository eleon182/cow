var ports = require('../json/ports');
var fs = require('fs');

function run(){
    ports.forEach(function(val){
        if(val){
            for(var key in val){
                if(val[key] === 's'){
                    val.sell = key;
                }
                else if(val[key] === 'b'){
                    val.buy = key;
                }
            }
        }
    });
    return ports;
}

fs.writeFile('../json/ports2.json', JSON.stringify(run()));
