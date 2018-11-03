var LoginView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

LoginView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
        this.setListeners();
    },
    setElements: function() {                           //Sets elements
        this.appbar = $('.nav-container');
        this.form = $('#loginForm');
    },
    loadAppBar: function() {                            //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {                          //Sets listeners
        this.form.submit(this.login.bind(this));
    },
    login: function() {                                 //Login user
        this.authenticate($('#username').val(), $('#password').val());
    }
};