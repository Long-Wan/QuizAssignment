$(function () {
    var model = new UserModel(),
        view = new UserView(),
        controller = new UserController(model, view);
        
    controller.init();
});