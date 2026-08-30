setTimeout(() => {
	mw.hook('wikipage.content').add(function() {
		fetch(`https://backrooms.fandom.com/wiki/${mw.config.get('wgPageName')}?action=raw`)
			.then(data => data.text())
			.then(wikitext => $('[data-summary*="AutoArchiver"]').attr('data-content', wikitext + '\n[[Category:AutoArchives]]'));
	});
}, 500);

window.FCButtons = [
	{
		label: 'Archive',
		target: 'User:' + mw.config.get('wgUserName') + '/AA/' + mw.config.get('wgPageName'),
		summary: 'AutoArchiver: ' + mw.config.get('wgPageName') + ' successfully archived',
		alwaysDisplay: true,
		prepend: true,
		placement: ':is(.ns-0, .ns-2) .page-header__meta'
	}
];

mw.loader.load('https://dev.fandom.com/wiki/MediaWiki:FastCreate.js?action=raw&ctype=text/javascript');