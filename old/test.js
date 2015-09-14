var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB();

query(106);
//put();
//scan();
function scan(){
    dynamodb.scan({TableName: 'cow'}, function(err, data){
        if (err) {
            console.log(err); // an error occurred
        } else {
            console.log(data.Items); // successful response
        }

    });

}
function query(client){
    var params = {
        TableName : 'new',
        //IndexName : 'index-index',
        //Select:'COUNT',
        KeyConditions : {
            "hash" : {
                "AttributeValueList" : [ { "N" :'103' } ],
                "ComparisonOperator" : "EQ"
            },
            "index" : {
                "AttributeValueList" : [ { "N" :'103' } ],
                "ComparisonOperator" : "GE"
            }
        },
    }
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.log (err)
        } else {
            console.log (data.Items)
        }
    });
}
function listTables(){
    dynamodb.listTables({}, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}



function put(){
    var item = {
        hash:{'N':'109'},
        range:{'N':'4449'},
        index:{'N':'5'}
    }
    dynamodb.putItem({TableName: 'new', Item: item}, function(err, data){
        if (err) {
            console.log(err); // an error occurred
        } else {
            console.log(data); // successful response
        }

    });
}
