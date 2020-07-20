require(['mw.User'], function(User) {
    console.log(User);
});
define('mw.User',[],function() {
    function User() {
        this.id = wgTrackID;
	this.name = wgUserName;
    }
    return new User();
});