var ConfirmView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

ConfirmView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
        this.setListeners();
    },
    setElements: function() {
        this.appbar = $('.nav-container');
        this.form = $('#confirmForm');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {
        this.form.submit(this.confirm.bind(this));
    },
    confirm: function() {
        this.confirmUser();
    }
};