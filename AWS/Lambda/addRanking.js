const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table = process.env.TABLE;

exports.handler = (event, context, callback) => { // event comes in is the full DynamoDB record
    docClient.put({
        TableName: table,
        Item: event
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("DynamoDB write succeeded with: ", data);
        }
        callback(null, {});
    });
};

