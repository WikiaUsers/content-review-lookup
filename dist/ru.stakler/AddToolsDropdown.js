/* ======================================================
// Скрипт основан на dev.fandom.com/wiki/WhatLinksHere
// Автор: DecabristM
// Описание: В выпадающем меню около кнопки «Править» скрипт заставляет все ссылки открывать новое окно, а также добавляет дополнительные инструменты для страницы: 
// * Журналы
// * Ссылки сюда
// * Сведения о странице
// * Просмотр удаленных версий
========================================================*/
(function() {
	'use strict';

	var $list = $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list, .UserProfileActionButton .WikiaMenuElement');

	if (!$list.length || window.AddToolsDropdown) {
		return;
	}
	window.AddToolsDropdown = true;

	var pagename = mw.config.get.wgPageName;
	var url_logs = mw.util.getUrl('Special:Logs', {page: pagename});
	var url_info = mw.util.getUrl(pagename, {action: 'info'}); 
	var url_undelete = mw.util.getUrl('Special:Undelete', {target: pagename});
	var url_whatlinkshere = mw.util.getUrl('Special:WhatLinksHere', {target: pagename});
/*	var url_diff = mw.util.getUrl(pagename, {diff: 'cur'}); */
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
			id: 'ca-undelete'
		}).append(
			$('<a>', {
				href: url_undelete,
				text: 'Просмотр удаленных версий'
			})
		)
	);
	
	$('#p-cactions a').attr('target', '_blank');
})();