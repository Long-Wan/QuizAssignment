$(function () {
    var model = new AdminModel(),
        view = new AdminView(),
        controller = new AdminController(model, view);
        
    controller.init();
});