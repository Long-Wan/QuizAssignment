var RankingView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

RankingView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
    },
    setElements: function() {
        this.appbar = $('.nav-container');
        this.ranking = $('#ranking-container');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    loadRanking: function() {
        $.when(this.getRanking()).done((data) => {
            if (data) {
                this.displayRanking(data);
            } else {
                this.noRanking();
            }
        });
    },
    displayRanking: function(data) {
        data.sort((a, b) => {
            return b.correct - a.correct;
        });

        var rankingHtml = '<table><thead><tr><th>Username</th><th class="right">Score</th></tr></thead>';
        rankingHtml += '<tbody>';
        data.forEach((element) => {
            if (this.getCurUser().username == element.username) {
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
    noRanking: function() {
        let message = '<div class="no-ranking center"><h4>There are no scores to rank yet, go to the <a href="User.html">User</a> page to take the quiz</h4></div>';
        this.ranking.html(message);
    }
};