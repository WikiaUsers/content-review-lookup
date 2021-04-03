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
			var el = document.createElement('textarea');
			el.value = str;
			el.setAttribute('readonly', '');
			$(el).insertAfter('#contentSub');
			el.select();
		});
	});
});

$(function() {
	if (mw.config.get('wgTitle') != 'Search') return;
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', '!Copy Results', 'ca-copy-search-results', 'Copy Search Results', null, '#ca-move-to-user')).click(function() {
		var pageList = [];
		$('.mw-search-result-heading a:first-of-type').each(function() {
			pageList.push($(this).attr('title'));
		});
		var str = pageList.join('\n');
		var el = document.createElement('textarea');
		el.value = str;
		el.setAttribute('readonly', '');
		$(el).insertAfter('#contentSub');
		el.select();
	});
});