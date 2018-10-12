var AdminController = function(model, view) {
    this.model = model;
    this.view = view;
};

AdminController.prototype = {
    init: function() {
        this.view.addQuestion = this.model.addQuestion.bind(this.model);
        this.view.storeQuestions = this.model.storeQuestions.bind(this.model);
        this.view.retrieveQuestions = this.model.retrieveQuestions.bind(this.model);
        this.view.checkQuestions();
    }
};