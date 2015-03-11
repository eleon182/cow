var nav = {};
var q = require ('q');
var universe = require ('./universe');

nav.getPath = function(start,end){
    var list = [{del:false, data:[start]}];
    var visited = [start];
    if(start == end ){
        return [start];
    }
    else{
        var links, conc = [];
        for(var i = 0 ; i < list.length; i ++){

            universe.querySector(list[i], function(val){

                val.forEach(function(inner){

                    if(inner == end){
                        list[i].push(end);
                        return list[i];
                    }
                    else{

                        visited.push(inner);
                        for(var j = 0 ; j < list.length ; j ++){

                            
                            list[j].forEach(function(inner2){
                                if(visited.indexOf(inner2)){


                                }


                            });

                        };

                    }

                });

            });

        }

    }
};
function determineDelete(a, visited){
    var resp = true;
    a.forEach(function(val){
        if(visited.indexOf(val)){
            resp = false;
        }
    });
    return resp;
}
deleteDeadEnds([[1,2,3],[4,5,6]], [2729,4464,6942,7763]).then( function(val){
    console.log(val);
    val.forEach(function(d){
        console.log(d);
    });
});
function deleteDeadEnds(list, visited ){

    var q = q.defer();
    var resp = [];
    var x = 0;
    while(x < list.length){
        (function(async){
            universe.querySector(list[async][list[async].length-1], function(val){
                if(determineDelete(val,visited)){
                    resp.push(async);
                    console.log(resp);
                }
                console.log(list);
                if(async>=list.length){
                    console.log(resp);
                    resp.forEach(function(val){
                        list.splice(val,1);
                    });
                    q.resolve(list);
                }
            });
        }(x));
        x++;
    }
    return q.promise;
}
module.exports = nav;
