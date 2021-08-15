/* ======================================================
// Добавляет в выпадающие меню около кнопки «Править» ссылки на дополнительные инструменты для страницы
// * Журналы
// * Сведения о странице
// * Последние изменения
// * Просмотр удаленных версий
// * Ссылки сюда
// * Связанные правки
// Скрипт основан на dev.fandom.com/wiki/WhatLinksHere
// Автор оригинального скрипта: KockaAdmiralac
// Адаптировал под свои нужды: DecabristM
========================================================*/
importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:Fetch.js'
	});

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

	mw.hook('dev.fetch').add(function(fetch) {
		$.when(
			mw.loader.using('mediawiki.util')
		).then(function(text) {
			var url_logs = mw.util.getUrl('Special:Logs', {page: config.wgPageName});
			var url_info = mw.util.getUrl(config.wgPageName, {action: 'info'});
			var url_diff = mw.util.getUrl(config.wgPageName, {diff: 'cur'});
			var url_undelete = mw.util.getUrl('Special:Undelete', {target: config.wgPageName});
			var url_whatlinkshere = mw.util.getUrl('Special:WhatLinksHere', {target: config.wgPageName});
/*			var url_whatleaveshere = mw.util.getUrl('Special:WhatLeavesHere', {target: config.wgPageName}); */
			var url_recentchangeslinked = mw.util.getUrl('Special:RecentChangesLinked', {target: config.wgPageName});

			$list.append(
				$('<li>', {
					id: 'atd-logs'
				}).append(
					$('<a>', {
						href: url_logs,
						target: '_blank',
						text: 'Журналы'
					})
				)
			);
			$list.append(
				$('<li>', {
					id: 'atd-info'
				}).append(
				$('<a>', {
						href: url_info,
						target: '_blank',
						text: 'Сведения о странице'
						})
				)
			);
			$list.append(
				$('<li>', {
					id: 'atd-diff'
				}).append(
					$('<a>', {
						href: url_diff,
						target: '_blank',
						text: 'Последние изменения'
					})
				)
			);
			$list.append(
				$('<li>', {
					id: 'atd-undelete'
				}).append(
					$('<a>', {
						href: url_undelete,
						target: '_blank',
						text: 'Просмотр удаленных версий'
					})
				)
			);
			$list.append(
				$('<li>', {
					id: 'atd-whatlinkshere'
				}).append(
					$('<a>', {
						href: url_whatlinkshere,
						target: '_blank',
						text: 'Ссылки сюда'
					})
				)
			);
			$list.append(
				$('<li>', {
					id: 'atd-recentchangeslinked'
				}).append(
					$('<a>', {
						href: url_recentchangeslinked,
						target: '_blank',
						text: 'Связанные правки'
					})
				)
			);
		});
	});
})();