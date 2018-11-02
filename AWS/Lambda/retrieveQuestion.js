const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context){
  var params = {
    TableName: "QuizQuestions"
  };

  docClient.scan(params, function(err, data) {
      if (err) {
          console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          context.callback();
      } else {
          context.succeed(getQuiz(data));
      }
  });
}

function getQuiz(data) {
  var questions = [];
  data.Items.forEach(function(item) {
      questions.push(item);
  });
  return questions;
}