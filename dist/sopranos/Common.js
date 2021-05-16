/* Any JavaScript here will be loaded for all users on every page load. */

/* UserTags */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		Founder: { u: 'Founder', order: 100 },
		sysop: { order: 1 } // Normal order is 0
	}
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */