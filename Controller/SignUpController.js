var SignUpController = function(model, view) {
    this.model = model;
    this.view = view;
};

SignUpController.prototype = {
    init: function() {
        this.view.saveUser = this.model.saveUser.bind(this.model);
    }
};