var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB();

module.exports = dynamodb;
