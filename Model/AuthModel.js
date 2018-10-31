var AuthModel = function() {
};

AuthModel.prototype = {
    getCurUser: function() {
        var cup = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: 'us-west-2_292Xullx0',
            ClientId: '40q17ev07chan9i4u4eco0kl8l'
        });
        var cognitoUser = cup.getCurrentUser();
        if (cognitoUser != null) {
            return cognitoUser.getSession((err, session) => {
                if (err) {
                    return null;
                } else {
                    return cognitoUser;
                }
            });
        } else {
            return null;
        }
    },
    logout: function() {
        let user = this.getCurUser();
        if (user) {
            user.signOut();
        }
    },
    registerUser: function(username, password, email) {
        var cup = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: 'us-west-2_292Xullx0',
            ClientId: '40q17ev07chan9i4u4eco0kl8l'
        });
        var attributes = [
            new AmazonCognitoIdentity.CognitoUserAttribute({
                Name : 'email',
                Value : email
            })
        ];

        cup.signUp(username, password, attributes, null, (err, data) => {
            if (err) {
                M.toast({html: err, classes: 'red'});
            } else {
                M.toast({html: 'Success', classes: 'green'});
                this.saveUser(username);
                setInterval(()=>{window.location.replace('./Confirm.html');}, 2000);
            }
        });
    },
    saveUser: function(username) {
        localStorage.setItem('username', username);
    },
    getUsername: function() {
        return localStorage.getItem('username');
    },
    confirmUser: function() {
        var poolData = {
            UserPoolId : 'us-west-2_292Xullx0',
            ClientId : '40q17ev07chan9i4u4eco0kl8l'
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : this.getUsername(),
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmRegistration($('#confirmCode').val(), true, function(err, result) {
            if (err) {
                M.toast({html: err.message, classes: 'red'});
                console.log(err);
            } else {
                M.toast({html: 'Account Confirmed', classes: 'green'});
                setInterval(()=>{window.location.replace('./Login.html');}, 2000);
            }
        });
    }
};