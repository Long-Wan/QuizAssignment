var UserController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

UserController.prototype = {
    init: function() {
        this.view.retrieveQuiz = this.model.retrieveQuiz.bind(this.model);
        this.view.checkQuiz();
    }
};