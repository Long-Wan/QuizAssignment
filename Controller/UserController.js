var UserController = function(model, view) {
    this.model = model;
    this.view = view;
};

UserController.prototype = {
    init: function() {
        this.view.retrieveQuiz = this.model.retrieveQuiz.bind(this.model);
        this.view.checkQuiz();
    }
};