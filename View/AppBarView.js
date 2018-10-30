var AppBarView = function(auth) {
    this.auth = auth;
};

AppBarView.prototype = {
    generateAppBar: function(appbarContainer) {
        $.when(this.auth.getCurUser()).done((user) => {
            var appbar = '<div class="nav-wrapper light-blue">';
            appbar += '<a href="index.html" class="brand-logo center">Quiz</a>';
            appbar += '<ul id="nav-mobile" class="left">';
            if (user && user.username == "admin") {
                appbar += '<li><a href="Admin.html">Admin</a></li>';
            }
            appbar += '<li><a href="User.html">User</a></li>';
            appbar += '<li><a href="Ranking.html">Ranking</a></li>';
            appbar += '</ul>';
            appbar += '<ul class="right">';
            if (user) {
                appbar += '<li><a id="logoutBtn" href="index.html">Logout</a></li>';
            } else {
                appbar += '<li><a href="Login.html">Login</a></li>';
            }
            appbar += '</ul>';
            appbar += '</div>';
            appbarContainer.html(appbar);
        });
    },
    setLogoutListener: function() {
        $('#logoutBtn').click(this.logout.bind(this));
    },
    logout: function() {
        this.auth.logout();
    }
}