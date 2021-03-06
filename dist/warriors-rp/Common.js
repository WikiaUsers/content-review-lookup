importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('DisplayClock/code.js', 'dev');

/* Auto updating recent changes opt-in

* See w:c:dev:AjaxRC for info & attribution
*/



AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:BlockList"]
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls

* See w:c:dev:PurgeButton for info & attribution
*/



importScriptPage('PurgeButton/code.js', 'dev');



/* Any JavaScript here will be loaded for all users on every page load. */
jQuery('.achievementbox').mouseover(function() {
   jQuery("div", this).show();
})

jQuery('.achievementbox').mouseout(function() {
   jQuery("div", this).hide();
})

importScriptPage('ShowHide/code.js', 'dev')

/* Replaces Template:USERNAME with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


//* UserTags *//

// NOTE: ALL TAGS ARE UNDERGOING TESTING - RELEVANT USERS WILL BE ADDED SOON //

window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u:'Rollback', order: 3 },
		mod: 'Moderator',
		proleader: 'Project Leader'
                
	}
};
UserTagsJS.modules.custom = {
	'Lucan07': ['mod', 'rollback'], // 
        
};
UserTagsJS.modules.inactive = 30; // Adds the inactive tag to users that haven't edited in 30 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};
UserTagsJS.modules.userfilter = {
	'.Cinderflight': ['bureaucrat'], 
	'JediForJesus': ['bureaucrat'], 
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});