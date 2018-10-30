$(function () {
    var model = new AdminModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new AdminView(appbar),
        controller = new AdminController(model, view, auth);
        
    controller.init();
});