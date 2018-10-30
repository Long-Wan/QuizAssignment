var AdminController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

AdminController.prototype = {
    init: function() {
        this.view.addQuestion = this.model.addQuestion.bind(this.model);
        this.view.storeQuestions = this.model.storeQuestions.bind(this.model);
        this.view.retrieveQuestions = this.model.retrieveQuestions.bind(this.model);
        this.view.checkQuestions();
    }
};