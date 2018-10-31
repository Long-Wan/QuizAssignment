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
    setElements: function() {
        this.appbar = $('.nav-container');
        this.form = $('#loginForm');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {
        this.form.submit(this.login.bind(this));
    },
    login: function() {
        this.authenticate($('#username').val(), $('#password').val());
    }
};