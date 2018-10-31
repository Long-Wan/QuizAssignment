var AppView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

AppView.prototype = {
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