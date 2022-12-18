$(function() {
	wgNamespace = mw.config.get('wgCanonicalNamespace');
	if (wgNamespace != 'Category') return;
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Copy Members', 'ca-copy-cat-members', 'Copy Category Members', null, '#ca-move-to-user')).click(function() {
		a = new mw.Api();
		a.get({
			action : 'query',
			list : 'categorymembers',
			cmtitle : mw.config.get('wgPageName'),
			cmlimit : 'max'
		}).then(function(data) {
			tbl = [];
			for (page in data.query.categorymembers) {
				tbl.push(data.query.categorymembers[page].title);
			}
			var str = tbl.join('\n');
			displayOutputText(str, true);
		});
	});
});

/* copy titles from search, recentchanges, contribs */
$(function() {
	var selectors = [
		{ pattern: 'Special:Search', selector: '.unified-search__result__title', attr: 'data-title' },
		{ pattern: 'Special:Contributions/', selector: '.mw-contributions-title', attr: 'title' },
		{ pattern: 'Special:RecentChanges', selector: '.mw-changeslist-line-inner .mw-title a', attr: 'title' },
	];
	var pageName = mw.config.get('wgPageName');
	for (i in selectors) {
		if (!pageName.includes(selectors[i].pattern)) continue;
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Copy Titles', 'ca-copy-search-results', 'Copy Titles', null, '#ca-move-to-user')).click(function() {
			var pageList = [];
			$(selectors[i].selector).each(function() {
				pageList.push($(this).attr(selectors[i].attr));
			});
			var str = pageList.join('\n');
			displayOutputText(str, true);
		});
		// don't let i keep incrementing
		return;
	}
});