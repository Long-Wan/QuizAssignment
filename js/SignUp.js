$(function () {
    var model = new SignUpModel(),
        view = new SignUpView(),
        controller = new SignUpController(model, view);
        
    controller.init();
});