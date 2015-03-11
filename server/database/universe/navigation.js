var nav = {};
var q = require ('q');
var universe = require ('./universe');
nav.getPath = function(start,end){
};
function determineDelete(a, visited, index){
    var resp = {index: index, value: true};
    a.forEach(function(val){
        if(visited.indexOf(val)==-1){
            resp.value = false;
        }
    });
    return resp;
}
//deleteDeadEnds([[1,2,3],[4,5,6]], ['4006','1096','1539','2729','4464','6942','7763']).then(function(val){console.log(val)});
function deleteDeadEnds(list, visited ){
    var resp = [];
    var Q=q.defer();
    findDeadEnds(list,visited).then(function(val){
        list.forEach(function(a, index){
            if(val.indexOf(index)==-1){
                resp.push(a);
            }
        });
        Q.resolve(resp);
    });
    return Q.promise;
        
}
function findDeadEnds(list, visited ){
    var Q = q.defer();
    var resp = [];
    var count = 0;
    list.forEach(function(a, index){
        universe.querySectorPromise(a[a.length-1]).then(function(val){
            var temp = [];
            val.forEach(function(a){
                temp.push(a.link.N);
            });
            
            var b = determineDelete(temp,visited, index);
            if(b.value){
                resp.push(b.index);
            }
            if(count == list.length-1){
                Q.resolve(resp);
            }
            count ++;
        });
    });
    return Q.promise;
}
module.exports = nav;
