;(function() {
	var conf = mw.config.get([ 'wgPageName', 'wgUserGroups' ]);
	if (conf.wgPageName !== '�Lo_sab�as?' || !/sysop|wiki-representative/.test(conf.wgUserGroups.join())) return;

	mw.hook('dev.ct').add(function(addButtons) {
		addButtons({
			click: function() {
				var api = new mw.Api();
				api.get({
					action: 'query',
					formatversion: 2,
					prop: 'revisions',
					rvprop: 'content',
					rvslots: '*',
					titles: '�Lo sab�as?'
				}).then(function(req) {
					var content = req.query.pages[0].revisions[0].slots.main.content;
					var matches = content.match(/\*(.*?)\n/g).map(function(match) {
						return '\t\'' + match.replace('*', '').replace(/'/g, '\\\'').trim() + '\'';
					});
					var table = 'return {\n' + matches.join(',\n') + '\n}';
					api.postWithToken('csrf', {
						action: 'edit',
						summary: 'Actualizaci�n autom�tica',
						text: table,
						title: 'Module:Lo sab�as/datos'
					}).then(function(result) {
						var revid = result.edit.newrevid;
						var message;
						var theme;
						if (revid) {
							message = 'Se ha actualizado exitosamente el m�dulo de "�Lo sab�as?". (<a href="/es/wiki/Module:Lo_sab�as/datos">ver</a>&nbsp;|&nbsp;<a href="/es/wiki/?diff=' + revid + '">diff</a>)';
							theme = 'confirm';
						} else {
							message = 'No se ha hecho ning�n cambio. Es posible que el m�dulo ya estuviera actualizado. (<a href="/es/wiki/Module:Lo_sab�as/datos">ver m�dulo</a>)';
							theme = 'error';
						}
						mw.hook('dev.banners').add(function(BannerNotification) {
						    // BannerNotification is the banner constructor
						    new BannerNotification(message, theme).show();
						});
					});
				});
			},
			placement: 'page-actions-dropdown',
			position: -1,
			text: 'Actualizar m�dulo'
		});
	});

	importArticle({
		type: 'script',
		articles: [
    		'u:dev:MediaWiki:BannerNotification.js',
			'u:dev:MediaWiki:CustomTools.js'
		]
	});
}());