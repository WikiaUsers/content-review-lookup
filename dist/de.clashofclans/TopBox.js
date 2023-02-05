mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
 
	if (mw.config.get('wgAction') === 'view' && mw.config.get('wgNamespaceNumber') > -1) {
		api.get({
			action: 'parse',
			page: 'Vorlage:TopBoxText',
			prop: 'text'
		}).done(function (json) {
			$('#WikiaRail').append('<section id="top-box-text" class="rail-module">' +  json.parse.text['*'] + '</section>');
		});
	}
});