$(function () {
    var model = new ConfirmModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new ConfirmView(appbar),
        controller = new ConfirmController(model, view, auth);
        
    controller.init();
});