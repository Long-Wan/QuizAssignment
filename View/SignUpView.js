var SignUpView = function(appBarView) {
    this.appBarView = appBarView;
    this.init();
};

SignUpView.prototype = {
    init: function() {
        this.setElements();
        this.loadAppBar();
        this.setListeners();
    },
    setElements: function() {
        this.appbar = $('.nav-container');
        this.form = $('#signupForm');
        this.password = $('#password');
        this.cpassword = $('#cpassword');
    },
    loadAppBar: function() {
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {
        this.form.submit(this.register.bind(this));
        this.cpassword.change(this.validatePass.bind(this));
    },
    register: function() {
        this.registerUser($('#username').val(), $('#password').val(), $('#email').val());
    },
    validatePass: function() {
        if (this.password.val() != this.cpassword.val()) {
            this.cpassword[0].setCustomValidity("Passwords do not match");
        }
    }
};