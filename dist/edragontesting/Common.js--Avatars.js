$(function () {
	var username = mw.config.get('wgUserName');
	var user = mw.config.get('wgTitle');
	var target = mw.util.getParamValue('target');
    var parts = user.split("/");

//Contributions and Activity 
if (
            wgCanonicalSpecialPageName === 'Contributions' ||
            wgCanonicalSpecialPageName === 'UserProfileActivity'
        ){if (target) {
                user = decodeURIComponent(target).replace(/_/g, ' ');
            }else if (parts.length > 1 && parts[1] !== '') {
                user = parts[1];}else {
                	user = username;
                	if (user === null) {
                		user = '';
                	}
                }
}	if (!$('#userProfileApp, #MessageWall, #articleComments').length || !user && !username) {
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