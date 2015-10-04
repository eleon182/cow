
var ports = require('../json/ports');
var nav = require('../json/navigation');

console.log(nav.length);
var count = 0;
for(var x = 1; x<=5000; x++){
    if(ports[x] === undefined){
        count++;
        console.log(x);
    }
}
console.log(count);
