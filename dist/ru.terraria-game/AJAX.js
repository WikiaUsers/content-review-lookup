$(function() {
	var l10n = l10nFactory(mw.config.get('wgUserLanguage'),{
		showData: {
			'en': 'Show data',
			'ru': 'Показать данные',
			'uk': 'Показати дані'
		},
		wait: {
			'en': 'Please wait, the content is being loaded...',
			'ru': 'Пожалуйста, подождите, контент загружается...',
			'uk': 'Будь ласка, зачекайте вміст завантажиться…'
		},
		edit: {
			'en': 'edit',
			'ru': 'редактировать',
			'uk': 'редагувати'
		},
		hide: {
			'en': 'hide',
			'ru': 'скрыть',
			'uk': 'згорнути',
		},
		show: {
			'en': 'show',
			'ru': 'показать',
			'uk': 'розгорнути',
		},
		error: {
			'en': 'Unable to load table; the source article for it might not exist.',
			'ru': 'Невозмжно подключится к таблице; возожно, страницы с данными не существует',
			'uk': 'Неможливо завантажити вміст; можливо, цільова сторінка не існує.',
		}
	});
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first();
		var needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html();
			var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep !== old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink){
			headerLinks.html('[<a href="javascript:;" class="ajax-load-link">'+l10n('showData')+'</a>]');
		}
		table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text(l10n('wait'));
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (!data) {
					return;
				}
				cell.html(data);
				cell.find('.ajaxHide').remove();
				cell.find('.terraria:not(.ajaxForceTerraria)').removeClass('terraria');
				if (cell.find("table.sortable").length) {
					mw.loader.using('jquery.tablesorter', function() {
						cell.find("table.sortable").tablesorter();
					});
				}
				headerLinks.text('[');
				headerLinks.append($('<a>'+l10n('edit')+'</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
				headerLinks.append(document.createTextNode(']\u00A0['));
				var shown = true;
				$("<a href='javascript:;'>"+l10n('hide')+"</a>").click(function() {
					shown = !shown;
					cell.toggle(shown);
					$(this).text(shown ? l10n('hide') : l10n('show'));
				}).appendTo(headerLinks);
				headerLinks.append(document.createTextNode(']'));
			}).error(function() {
				cell.text(l10n('error'));
			});
		});
	});
});