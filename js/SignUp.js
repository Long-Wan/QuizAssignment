$(function () {
    var model = new SignUpModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new SignUpView(appbar),
        controller = new SignUpController(model, view, auth);
        
    controller.init();
});