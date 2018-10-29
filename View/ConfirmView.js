var ConfirmView = function() {
    this.init();
};

ConfirmView.prototype = {
    init: function() {
        this.setElements();
        this.setListeners();
    },
    setElements: function() {
        this.form = $('#confirmForm');
    },
    setListeners: function() {
        this.form.submit(this.confirmUser.bind(this));
    },
    confirmUser: function() {
        var poolData = {
            UserPoolId : 'us-west-2_292Xullx0',
            ClientId : '40q17ev07chan9i4u4eco0kl8l'
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : this.retrieveCurrentUser(),
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmRegistration($('#confirmCode').val(), true, function(err, result) {
            if (err) {
                M.toast({html: "An error occurred", classes: 'red'});
                console.log(err);
            } else {
                M.toast({html: 'Account Confirmed', classes: 'green'});
                setInterval(()=>{window.location.replace('./Login.html');}, 2000);
            }
        });
    }
};