$(function () {
    var model = new RankingModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new RankingView(appbar),
        controller = new RankingController(model, view, auth);
        
    controller.init();
});