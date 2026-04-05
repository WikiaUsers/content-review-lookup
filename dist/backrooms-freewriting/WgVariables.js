(() => {
	'use strict';
	if (window.wgVariablesLoaded) return;
	window.wgVariablesLoaded = true;
	const wgVariablesObj = Object.freeze({
		'username': mw.config.get('wgUserName'),
		'usergroups': mw.config.get('wgUserGroups'),
		'action': mw.config.get('wgAction'),
		'userid': mw.config.get('wgUserId'),
		'namespacenumber': mw.config.get('wgNamespaceNumber'),
		'usereditcount': mw.config.get('wgUserEditCount'),
		'title': mw.config.get('wgTitle'),
		'isredirect': mw.config.get('wgIsRedirect'),
		'redirectedfrom': mw.config.get('wgRedirectedFrom')
	});
	$('body').attr(wgVariablesObj);
	$('.wgvariables').each(function() {
		$(this).attr(wgVariablesObj);
	});
})();