var RankingModel = function() {
};

RankingModel.prototype = {
    getRanking: function() {            //Gets ranking from db through api
        return $.ajax({
            url:'https://6c6pjnpmai.execute-api.us-west-2.amazonaws.com/Prod/ranking',
            headers: {
                'x-api-key': '7Gotub6HrE2oN6YlpXuHaapLR10KHbDf790teKBT'
            },
            type: 'get',
            contentType: 'application/json',
        });
    }
};