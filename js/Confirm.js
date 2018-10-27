$(function () {
    var model = new ConfirmModel(),
        view = new ConfirmView(),
        controller = new ConfirmController(model, view);
        
    controller.init();
});