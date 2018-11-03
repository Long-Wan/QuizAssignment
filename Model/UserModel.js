var UserModel = function() {
};

UserModel.prototype = {
    retrieveQuiz: function() {              //Gets quiz from db through api
        return $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/quiz',
            headers: {
                'x-api-key': ''
            },
            type: 'get',
            contentType: 'application/json',
        });
    },
    submitRanking: function(username, correctCount, questionCount) {    //Submits ranking to db through api
        let json = {
            'username': username,
            'correct': correctCount,
            'total': questionCount
        };
        $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/ranking',
            headers: {
                'x-api-key': ''
            },
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(json),
            success: null,
            error: null
        });
    }
};