/*Set Write a Reply avatar alt and title to user logged in*/
	$(function () {
    var username = mw.config.get('wgUserName');
    if (!$('#MessageWall, #articleComments').length || !username) {
        return;
    }
    
    var interval = setInterval(function () {
        var element = $('#MessageWall .wds-avatar > .wds-avatar__image, #articleComments .wds-avatar > .wds-avatar__image');
        if (!element.length) {
            return;
        }

        element.attr('alt', username);
		element.attr('title', username);
    }, 100);
});

/*Set Masthead avatar alt and title to the full username of the owner, and not the aka*/
$(function () {
	var username = mw.config.get('wgUserName');
	var user = mw.config.get('wgTitle');
	var target = mw.util.getParamValue('target').replace(/_/g, ' ');
    var parts = mw.config.get('wgTitle').split("/");

//Contributions and Activity 
if (
            wgCanonicalSpecialPageName === 'Contributions' ||
            wgCanonicalSpecialPageName === 'UserProfileActivity'
        )
        //First we check for and use the target parameter
        {if (target) {user = target;}
        //If target doesn't exist, then we check if we are on plain Contributions
        else if (
        	wgPageName === 'Special:Contributions' || 
        	wgPageName === 'Special:Contributions/'
        ){user = username;}
        //If not, we use the path
        else {if (parts.length === 2) {
                user = parts[1];}}
}	if (!$('#userProfileApp').length || !user) {
        return;
    }
    
    var interval = setInterval(function () {
        var element = $('#userProfileApp .user-identity-avatar__image');
        if (!element.length) {
            return;
        }
        element.attr('alt', user);
        element.attr('title', user);
    }, 100);
});

/*Thanks to Sophiedp for developing the "Write a Reply" part of this. 
Masthead part an adaptation by E12Dragon.
*/