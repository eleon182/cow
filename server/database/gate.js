var db = require('./dynamodb');
function scan(){
    dynamodb.scan({TableName: 'universe'}, function(err, data){
        if (err) {
            console.log(err); // an error occurred
        } else {
            console.log(data.Items); // successful response
        }

    });
}
function deletetable(table){
    var params = {
        TableName: table
    };
    dynamodb.deleteTable(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}
function query(client){
    var params = {
        TableName : 'steve',
        //IndexName : 'index-index',
        //Select:'COUNT',
        KeyConditions : {
            "hash" : {
                "AttributeValueList" : [ { "N" :'2' } ],
                "ComparisonOperator" : "EQ"
            },
            "range" : {
                "AttributeValueList" : [ { "N" :'10' } ],
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
