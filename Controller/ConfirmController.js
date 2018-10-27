var ConfirmController = function(model, view) {
    this.model = model;
    this.view = view;
};

ConfirmController.prototype = {
    init: function() {
        this.view.retrieveCurrentUser = this.model.retrieveCurrentUser.bind(this.model);
    }
};