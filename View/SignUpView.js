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
    setElements: function() {                   //Sets listeners
        this.appbar = $('.nav-container');
        this.form = $('#signupForm');
        this.password = $('#password');
        this.cpassword = $('#cpassword');
    },
    loadAppBar: function() {                    //Loads appbar and sets logout listener
        this.appBarView.generateAppBar(this.appbar);
        this.appBarView.setLogoutListener();
    },
    setListeners: function() {                  //Sets listeners
        this.form.submit(this.register.bind(this));
        this.cpassword.change(this.validatePass.bind(this));
    },
    register: function() {                      //Registers a user
        this.registerUser($('#username').val(), $('#password').val(), $('#email').val());
    },
    validatePass: function() {                  //Validates if passwords match
        if (this.password.val() != this.cpassword.val()) {
            this.cpassword[0].setCustomValidity("Passwords do not match");
        }
    }
};