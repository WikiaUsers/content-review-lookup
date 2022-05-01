mw.loader.using(['mediawiki.util','mediawiki.api']).done(function(data){
	if (!mw.util.getParamValue('autolang')) return;
	if (mw.config.get('wgUserLanguage') === mw.config.get('wgContentLanguage')) return;
	new mw.Api().get({action:'query',titles:mw.config.get('wgPageName'),prop:'langlinks',lllang:mw.config.get('wgUserLanguage'),llprop:'url'}).done(function(data){
		for (var p in data.query.pages) {
			if (data.query.pages[p].langlinks === undefined) continue;
			location.href = data.query.pages[p].langlinks[0].url;
		}
	});
});