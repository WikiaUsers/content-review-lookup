/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
	var wgUserGroups = mw.config.get('wgUserGroups');

	if (wgUserGroups.includes('content-moderator') ||
		wgUserGroups.includes('sysop') ||
		wgUserGroups.includes('bureaucrat')) {
		importArticle({ article: 'MediaWiki:Group-sysop.js' });
	}
}());