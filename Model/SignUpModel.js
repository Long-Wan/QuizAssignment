var SignUpModel = function() {
};

SignUpModel.prototype = {
    saveUser: function(username) {
        localStorage.setItem('username', username);
    }
};