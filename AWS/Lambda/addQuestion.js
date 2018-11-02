const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const table = process.env.TABLE;

exports.handler = (event, context, callback) => { // event comes in is the full DynamoDB record

    docClient.scan({TableName: table}, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          context.callback();
      } else {
        if (data.Items.length > 0) {
            var count = data.Items.length;
            data.Items.forEach(function(item) {
            docClient.delete({
                TableName: table,
                Key: {id: item.id}
            }, function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    count--;
                    if (count <= 0) {
                        event.forEach((record) => {
                        docClient.put({
                            TableName: table,
                            Item: record
                        }, function(err, data) {
                            if (err) console.log(err);
                            else console.log("DynamoDB write succeeded with: ", data);
                        });
                        });
                        clearRanking();
                        callback(null, {});
                    }
                };
            });
         });
        } else {
            event.forEach((record) => {
                        docClient.put({
                            TableName: table,
                            Item: record
                        }, function(err, data) {
                            if (err) console.log(err);
                            else console.log("DynamoDB write succeeded with: ", data);
                        });
                        });
                        clearRanking();
                        callback(null, {});
        }
      }
    });
};

function clearRanking() {
    docClient.scan({TableName: "QuizRanking"}, function(err, data) {
        if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          context.callback();
      } else {
        if (data.Items.length > 0) {
            data.Items.forEach(function(item) {
                docClient.delete({
                    TableName: "QuizRanking",
                    Key: {username: item.username}
                }, function(err, data) {
                    if (err) {
                        console.log(err);
                    }
                });
             });
        }
      }
    });
};