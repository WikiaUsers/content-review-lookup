/* Replaces {{USERNAME}} with the name of the user browsing the page.
	Requires copying Template:USERNAME. */

function UserNameReplace() {
	if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
	$("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
// Insert username
if (mwConfig.wgAction === 'view' && mwConfig.wgUserName !== null) {
	$('.insertusername').text(mwConfig.wgUserName);
}

// Insert username
if (mwConfig.wgAction === 'view' && mwConfig.wgUserName !== null) {
	$('.insertusername').text(mwConfig.wgUserName);
}