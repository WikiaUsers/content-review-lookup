(function() {
	'use strict';

	var $list = $('.page-header__actions .wds-list');

	if (!$list.length) {
		return;
	}

	var pagename = mw.config.values.wgPageName;
	var url_logs = mw.util.getUrl('Special:Logs', {page: pagename});
	var url_info = mw.util.getUrl(pagename, {action: 'info'});
	var url_diff = mw.util.getUrl(pagename, {diff: 'cur'}); 
	var url_undelete = mw.util.getUrl('Special:Undelete', {target: pagename});
	var url_whatlinkshere = mw.util.getUrl('Special:WhatLinksHere', {target: pagename});
/*	var url_whatleaveshere = mw.util.getUrl('Special:WhatLeavesHere', {target: pagename}); */
/*	var url_recentchangeslinked = mw.util.getUrl('Special:RecentChangesLinked', {target: pagename}); */

	$list.append(
		$('<li>', {
			id: 'ca-logs'
		}).append(
			$('<a>', {
				href: url_logs,
				text: 'Журналы'
			})
		)
	);
	$list.append(
		$('<li>', {
			id: 'ca-whatlinkshere'
		}).append(
			$('<a>', {
				href: url_whatlinkshere,
				text: 'Ссылки сюда'
			})
		)
	);
	$list.append(
		$('<li>', {
			id: 'ca-info'
		}).append(
			$('<a>', {
				href: url_info,
				text: 'Сведения о странице'
			})
		)
	);
	$list.append(
		$('<li>', {
			id: 'ca-diff'
		}).append(
			$('<a>', {
				href: url_diff,
				text: 'Последние изменения'
			})
		)
	);
	$list.append(
		$('<li>', {
			id: 'ca-undelete'
		}).append(
			$('<a>', {
				href: url_undelete,
				text: 'Просмотр удаленных версий'
			})
		)
	);
})();

(function() {
	$('.fandom-community-header__local-navigation a, .wiki-tools a, .page-header__actions .wds-list a').attr('target', '_blank');
})();