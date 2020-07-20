/* Any JavaScript here will be loaded for all users on every page load. */

/* The Purge Button */
PurgeButtonText = 'Refresh';

/* Inactive Users */
InactiveUsers = { 
    months: 1,
    text: 'Inactive'
};

/* Hero Image */
// Remove dark gradient
if(document.getElementsByClassName("image-window").length > 0) document.getElementsByClassName("image-window")[0].className = "";

/* User Tags */
// Custom
window.UserTagsJS = {
	modules: {},
	tags: {
		moderator: { u: 'Mod', order: 100 },
		rollback: { u: 'Rollback', order: 100 }
	}
};
 
UserTagsJS.modules.custom = {
    // Mod

	// Rollback
	'UrbanPie The Unpieing': ['rollback'],
};

/* Other/Unknown */

$(function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
});