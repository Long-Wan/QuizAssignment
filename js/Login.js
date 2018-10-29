$(function () {
    var model = new LoginModel(),
        view = new LoginView(),
        controller = new LoginController(model, view);
        
    controller.init();
});