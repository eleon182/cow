var display = {}
var stack = [];

display.getStatus = function(playerId , game){

}
display.getStatusDisplay = function(game){
	console.log (game)
}
display.getPollOutput = function(playerId){
    var response = [];
    for(var i =0; i< stack.length;i++){
        if(stack[i].playerId == playerId){
            response.push(stack[i]);
            stack.splice(i,1);
            i--;
        }
    }
    return response;
}
module.exports = display;
