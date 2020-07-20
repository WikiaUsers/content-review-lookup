mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
 
	if (skin === 'oasis' && wgAction === 'view' && wgNamespaceNumber > -1) {
		api.get({
			action: 'parse',
			page: 'Vorlage:TopBoxText',
			prop: 'text'
		}, {
			ok: function (json) {
				$('#WikiaRail').append('<section class="rail-module">' +  json.parse.text['*'] + '</section>');
			}
		});
	}
});