$(function () {
    var model = new UserModel(),
        auth = new AuthModel(),
        appbar = new AppBarView(auth),
        view = new UserView(appbar),
        controller = new UserController(model, view, auth);
        
    controller.init();
});