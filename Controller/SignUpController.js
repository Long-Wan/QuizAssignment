var SignUpController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

SignUpController.prototype = {
    init: function() {
        this.view.registerUser = this.auth.registerUser.bind(this.auth);
    }
};