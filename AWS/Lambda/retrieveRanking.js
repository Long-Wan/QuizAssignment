const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context){
  var params = {
    TableName: "QuizRanking"
  };

  docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          context.callback();
      } else {
          context.succeed(getRanking(data));
      }
  });
}

function getRanking(data) {
  var ranking = [];
  data.Items.forEach(function(item) {
      ranking.push(item);
  });
  return ranking;
}