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
    setElements: function() {                           //Sets elements
        this.appbar = $('.nav-container');
        this.form = $('#confirmForm');
    },
    loadAppBar: function() {                            //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {                          //Sets listeners
        this.form.submit(this.confirm.bind(this));
    },
    confirm: function() {                               //Confirms user
        this.confirmUser();
    }
};