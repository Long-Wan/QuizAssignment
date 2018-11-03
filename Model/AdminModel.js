var AdminModel = function() {
    this.questions = [];
};

AdminModel.prototype = {
    addQuestion: function(question) {           //Adds question to array
        this.questions.push(question);
    },
    storeQuestions: function() {                //Posts question array to api
        $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/quiz',
            headers: {
                'x-api-key': '7Gotub6HrE2oN6YlpXuHaapLR10KHbDf790teKBT'
            },
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.questions),
            success: null,
            error: null
        });
        this.questions = [];
        
    },
    retrieveQuestions: function() {             //Gets questions from db through api
        return $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/quiz',
            headers: {
                'x-api-key': '7Gotub6HrE2oN6YlpXuHaapLR10KHbDf790teKBT'
            },
            type: 'get',
            contentType: 'application/json'
        });
    }
};