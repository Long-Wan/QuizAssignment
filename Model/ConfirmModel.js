var ConfirmModel = function() {
};

ConfirmModel.prototype = {
    retrieveCurrentUser: function() {
        return localStorage.getItem('username');
    }
};