var AppView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

AppView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
    },
    setElements: function() {                       //Sets elements
        this.appbar = $('.nav-container');
    },
    loadAppBar: function() {                        //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    }
};