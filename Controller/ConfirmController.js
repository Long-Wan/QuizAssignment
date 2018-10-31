var ConfirmController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

ConfirmController.prototype = {
    init: function() {
        this.view.confirmUser = this.auth.confirmUser.bind(this.auth);
        this.view.retrieveCurrentUser = this.model.retrieveCurrentUser.bind(this.model);
    }
};