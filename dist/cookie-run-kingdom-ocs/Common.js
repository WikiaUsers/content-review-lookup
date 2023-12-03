/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
mw.hook('wikipage.content').add(function UserNameReplace() {
	var wgUserName = mw.config.get('wgUserName');
	if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
	$("span.insertusername").text(wgUserName);
});

/* End of the {{USERNAME}} replacement */