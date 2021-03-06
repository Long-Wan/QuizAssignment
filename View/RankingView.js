var RankingView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

RankingView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
    },
    setElements: function() {                           //Sets elements
        this.appbar = $('.nav-container');
        this.ranking = $('#ranking-container');
    },
    loadAppBar: function() {                            //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    loadRanking: function() {                           //Loads ranking from db and displays if exists
        $.when(this.getRanking()).done((data) => {
            if (data.length > 0) {
                this.displayRanking(data);
            } else {
                this.noRanking();
            }
        });
    },
    displayRanking: function(data) {                    //Generates and displays ranking table
        var user = this.getCurUser();
        data.sort((a, b) => {
            return b.correct - a.correct;
        });

        var rankingHtml = '<table><thead><tr><th>Username</th><th class="right">Score</th></tr></thead>';
        rankingHtml += '<tbody>';
        data.forEach((element) => {
            if (user && user.username == element.username) {
                rankingHtml += '<tr class="light-blue lighten-3"><td>' + element.username + '</td>';
                rankingHtml += '<td class="right">' + element.correct + '/' + element.total + '</td></tr>';
            } else {
                rankingHtml += '<tr><td>' + element.username + '</td>';
                rankingHtml += '<td class="right">' + element.correct + '/' + element.total + '</td></tr>';
            }
        });
        rankingHtml += '</tbody></table>';

        this.ranking.html(rankingHtml);
    },
    noRanking: function() {                            //Error message for no ranking
        let message = '<div class="no-ranking center"><h4>There are no scores to rank yet, go to the <a href="User.html">User</a> page to take the quiz</h4></div>';
        this.ranking.html(message);
    }
};