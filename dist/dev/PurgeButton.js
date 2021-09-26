// Used files: [[File:Loading.gif]]
mw.loader.using('mediawiki.api').then(function () {
	var el = $('.page-header__actions .wds-list #ca-purge');
	if (window.PurgeButtonLoaded || !el.length) {
		return;
	}
	window.PurgeButtonLoaded = true;
	
	if (typeof window.PurgeButtonText === 'string') {
		el.text(window.PurgeButtonText);
	}
	
	el.click(function (event) {
		event.preventDefault();

		el.html($('<img>', {
			src: 'https://static.wikia.nocookie.net/dev/images/4/42/Loading.gif'
		}));

		new mw.Api().post({
			action: 'purge',
			titles: mw.config.get('wgPageName')
		}).done(function () {
			location.reload();
		});
	});
});