$(function () {
    var auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new AppView(appbar),
        controller = new AppController(view, auth);
        
    controller.init();
});