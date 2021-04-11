$(function () {
	var username = mw.config.get('wgUserName');
	var user = mw.config.get('profileUserName');

	if (!$('#userProfileApp, #MessageWall, #articleComments').length || !user && !username) {
        return;
    }
    
    var interval = setInterval(function () {
        var element = $('#userProfileApp .user-identity-avatar__image');
        if (!element.length) {
            return;
        }
        element.attr('alt', user);
        element.attr('title', user);
    	clearInterval(interval);
    }, 100);
    var interval1 = setInterval(function () {
        var element1 = $('#MessageWall .wds-avatar > .wds-avatar__image, #articleComments .wds-avatar > .wds-avatar__image');
        if (!element1.length) {
            return;
        }
        element1.attr('alt', username);
        element1.attr('title', username);
    }, 100);
});

/*Thanks to Sophiedp for developing the "Write a Reply" part of this. 
Masthead part an adaptation by E12Dragon.
*/