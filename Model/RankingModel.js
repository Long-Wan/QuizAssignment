var RankingModel = function() {
};

RankingModel.prototype = {
    getRanking: function() {            //Gets ranking from db through api
        return $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/ranking',
            headers: {
                'x-api-key': ''
            },
            type: 'get',
            contentType: 'application/json',
        });
    }
};