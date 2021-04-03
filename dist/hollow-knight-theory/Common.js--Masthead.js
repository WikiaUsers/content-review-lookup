/* Any JavaScript here will be loaded for all users on every page load. */
//This script was built by E12Dragon

/*Give an alt and title to Masthead Bio based on user*/
$(function () {
	var username = mw.config.get('wgUserName');
	var user = mw.config.get('wgTitle');
	var target = mw.util.getParamValue('target');
    var parts = mw.config.get('wgTitle').split("/");

//Contributions and Activity 
if (
            wgCanonicalSpecialPageName === 'Contributions' ||
            wgCanonicalSpecialPageName === 'UserProfileActivity'
        ){if (target) {
                user = decodeURIComponent(target).replace(/_/g, ' ');
            }else if (
        	wgPageName === 'Special:Contributions' || 
        	wgPageName === 'Special:Contributions/'
        ){user = username;
        }else {
                user = parts[1];}
}	if (!$('#userProfileApp').length || !user) {
        return;
    }
    
    var interval = setInterval(function () {
        var element = $('#userProfileApp .user-identity-bio ');
        if (!element.length) {
            return;
        }
        element.attr('alt', user + "\'s bio");
        element.attr('title', user + "\'s bio");
    }, 100);
});