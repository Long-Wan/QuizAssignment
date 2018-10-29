var LoginView = function() {
    this.init();
};

LoginView.prototype = {
    init: function() {
        this.setElements();
        this.setListeners();
    },
    setElements: function() {
        this.form = $('#loginForm');
    },
    setListeners: function() {
        this.form.submit(this.authenticate.bind(this));
    },
    authenticate: function() {
        var authenticationData = {
            Username : $('#username').val(),
            Password : $('#password').val(),
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : 'us-west-2_292Xullx0', // Your user pool id here
            ClientId : '40q17ev07chan9i4u4eco0kl8l' // Your client id here
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : $('#username').val(),
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                window.location.replace('./User.html');
            },
    
            onFailure: function(err) {
                console.log(err);
                M.toast({html: err.message, classes: 'red'});
            },
    
        });
    }
};