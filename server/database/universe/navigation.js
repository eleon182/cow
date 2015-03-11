var nav = {};
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
var a = [1,2,3];
deleteDeadEnds(a,b);
function getLinks(list, callback){

    var resp = [];
    for(var x = 0;  x < list.length ; x++){


    }
}
function deleteDeadEnds(list, visited){

    var resp = [];
    var x = 0;
    while(x < list.length){
        universe.querySector(list[x][list[x].length-1], function(val){
            var del= true;
            val.forEach(function(inner){
                if(visited.indexOf(inner)==-1){
                    del = false;
                }
            });
            if(del){
                list.splice(x,1);
            }
            else{
                x++;
            }
        });
    }
}
module.exports = nav;
