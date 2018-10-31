var LoginController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

LoginController.prototype = {
    init: function() {
        this.view.authenticate = this.auth.authenticate.bind(this.auth);
    }
};