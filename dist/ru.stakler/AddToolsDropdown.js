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

	var config = mw.config.get([
		'wgPageName',
		'wgUserLanguage'
	]);

	$.when(
		mw.loader.using('mediawiki.util')
	).then(function(text) {
		var url_logs = mw.util.getUrl('Special:Logs', {page: config.wgPageName});
		var url_info = mw.util.getUrl(config.wgPageName, {action: 'info'}); 
/*		var url_diff = mw.util.getUrl(config.wgPageName, {diff: 'cur'}); */
		var url_undelete = mw.util.getUrl('Special:Undelete', {target: config.wgPageName});
		var url_whatlinkshere = mw.util.getUrl('Special:WhatLinksHere', {target: config.wgPageName});
/*		var url_whatleaveshere = mw.util.getUrl('Special:WhatLeavesHere', {target: config.wgPageName}); */
/*		var url_recentchangeslinked = mw.util.getUrl('Special:RecentChangesLinked', {target: config.wgPageName}); */
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
	});
	$('#p-cactions a').attr('target', '_blank');
})();