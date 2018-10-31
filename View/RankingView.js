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
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    }
};