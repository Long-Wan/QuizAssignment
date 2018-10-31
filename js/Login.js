$(function () {
    var model = new LoginModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new LoginView(appbar),
        controller = new LoginController(model, view, auth);
        
    controller.init();
});