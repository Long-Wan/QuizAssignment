var RankingController = function(model, view, auth) {
    this.model = model;
    this.view = view;
    this.auth = auth;
};

RankingController.prototype = {
    init: function() {
        this.view.getCurUser = this.auth.getCurUser.bind(this.auth);
        this.view.getRanking = this.model.getRanking.bind(this.model);
        this.view.loadRanking();
    }
};