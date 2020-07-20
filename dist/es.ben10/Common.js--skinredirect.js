// ==================================================================
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: Cacycle
// ==================================================================
if (wgArticleId == 0 && wgUserName) {
	var slash = wgPageName.indexOf('/');
	var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
	var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
	var ext = null;
	if (norm == test + 'js') ext = 'js';
	else if (norm == test + 'css') ext = 'css';
	if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
}