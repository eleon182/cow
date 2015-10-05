
var ports = require('../json/ports');
var ports2 = require('../json/ports2');
var nav = require('../json/navigation');


function run(){
    for(var x = 1; x < ports.length; x++){
        if(ports[x] && ports[x].code!== ports2[x].code){
            console.log(x);
        }
    }
}
run();
