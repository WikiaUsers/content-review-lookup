mediaWiki.loader.using('mediawiki.api', function () {
	var api = new mediaWiki.Api();
 
	if (skin === 'oasis' && wgAction === 'view' && wgNamespaceNumber > -1) {
		api.get({
			action: 'parse',
			page: 'Vorlage:RecentForum',
			prop: 'text'
		}, {
			ok: function (json) {
				$('#WikiaRail').append(json.parse.text['*']);
			}
		});
	}
});