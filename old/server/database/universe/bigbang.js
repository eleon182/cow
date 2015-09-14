var bigbang = {};
//main entry point to create a new universe.
bigbang.create = function(start,end,depth){
    //create the standard array that contains all the sectors
    var array = createUniverseArray(start,end);
    
    //create the random links between each sector
    return createLinks(array,start,end,depth);
};

//create the links by randomly picking a value between min and max. 
function createLinks(array, start,end, depth){
    var rand, currentDepth;

    for(var i = start ; i <=end; i++){
        currentDepth = random(depth);
        for(var j = 1; j <= currentDepth; j++){
            do{
                rand = random(end,start);
            }while(rand === i);           
            array[i].push(rand);
            array[rand].push(i);
        }
    }

    return filterLinks(array,start,end);        
}


//this function makes sure there are no repeat links and that no sectors link to themselves
function filterLinks(array, start,end){
    var newArray = createUniverseArray(start,end);
    for(var i = start ; i <=end; i ++){
       array[i].forEach(function(val){
           if(i !== val && newArray[i].indexOf(val)===-1){
                newArray[i].push(val);
           }
       }); 
    }
    var response = [];
    for(var i = start; i <=end ; i++){
         response.push({
            sector: i ,
            links:newArray[i]
         });
    }
   return response; 
}
function createUniverseArray(start,end){
    var resp = [];
    for(var i =start; i <=end; i++){
        resp[i] = [];
    }
    return resp;
}

// returns a random number. assumes min = 1 if not specified, otherwise will return a value between min and max (inclusive)
function random(max, min){
    if(!min){
        min=1;
    }
    return Math.floor(Math.random() * (max-min)) + min;
}

// shuffle an array randomly
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
module.exports = bigbang;
