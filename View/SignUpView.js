var SignUpView = function() {
    this.init();
};

SignUpView.prototype = {
    init: function() {
        this.setElements();
        this.setListeners();
    },
    setElements: function() {
        this.form = $('#signupForm');
    },
    setListeners: function() {
        this.form.submit(this.registerUser.bind(this));
    },
    registerUser: function() {
        var cup = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: 'us-west-2_292Xullx0',
            ClientId: '40q17ev07chan9i4u4eco0kl8l'
        });
        var attributes = [
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name : 'email',
            Value : $('#email').val()
        })];

        cup.signUp($('#username').val(), $('#password').val(), attributes, null, (err, data) => {
            if (err) {
                M.toast({html: err, classes: 'red'});
            } else {
                M.toast({html: 'Success', classes: 'green'});
                // window.location.replace('../confirm.html');
            }
        });
    }
};