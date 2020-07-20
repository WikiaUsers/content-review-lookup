$(function() {
	var lastEdited = $.extend({
		avatar: true,
		size: true,
		diff: true,
		comment: true,
		time: 'timeago',
		namespaces: {
			include: [],
			exclude: []
		},
		pages: []
	}, window.lastEdited);
	var allowed = [
		0, 6, 8, 10, 14, 15, 110, 111, 828, 829
	];
	if ($.isArray(lastEdited.namespaces.include)) {
		for (var i in lastEdited.namespaces.include) {
			allowed.push(lastEdited.namespaces.include[i]);
		}
	}
	if ($.isArray(lastEdited.namespaces.exclude)) {
		allowed = $(allowed).not(lastEdited.namespaces.exclude);
	}
	if (!$.getUrlVar('diff') && !$.getUrlVar('oldid') && $.getUrlVar('action') !== 'history' && $.inArray(mw.config.get('wgNamespaceNumber'), allowed) > -1 && !($.inArray(mw.config.get('wgPageName'), lastEdited.pages) > -1) && !mw.config.get('wgIsMainPage') && !window.lastEditedLoaded) {
		window.lastEditedLoaded = true;
		$.get(mw.util.wikiScript('api'), {
			action: 'query',
			titles: mw.config.get('wgPageName'),
			prop: 'revisions',
			rvprop: 'timestamp|user|userid|size|parsedcomment',
			rvdiffto: 'prev',
			format: 'json'
		}, function(data) {
			for (var i in data.query.pages) break;
			var rv = data.query.pages[i].revisions[0];
			html = '<div class="lastEdited"><img alt="Завантаження даних останнього редагування" title="Завантаження даних останнього редагування" style="margin:2px 10px" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif"></div>';
			switch (mw.config.get('skin')) {
				case 'oasis':
				case 'wikia':
					if ($('#WikiaPageHeader .header-container .header-title').length) {
						$('#WikiaPageHeader .header-container .header-title').append(html);
					}
					if ($('.WikiaUserPagesHeader').length) {
						$('.UserProfileActionButton').after(html);
						mw.util.addCSS('.lastEdited { padding-bottom: 5px; border-bottom: 1px solid ' + $('#WikiaPage').css('border-color') + ';}');
					}
					break;
				case 'monobook':
					if ($('#content #firstHeading').length) {
						if ($('#bodyContent #contentSub').length) {
							$('#bodyContent #contentSub').after(html);
							mw.util.addCSS('#bodyContent #contentSub {margin-bottom: 0 !important;}.lastEdited {margin: 5px auto 1.4em auto;}');
						} else {
							$('#content #firstHeading').after(html);
						}
						mw.util.addCSS('.lastEdited {line-height: 12px;border-bottom: ' + $('#firstHeading').css('border-bottom') + ';padding-bottom: 2px;}');
					}
					break;
			}
			var time = '<span class="timeago" title="' + rv.timestamp + '"></span>';
			if (lastEdited.time === 'timestamp') {
				time = new Date(rv.timestamp).toUTCString().slice(0, 16) + ', ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC)';
			}
			var user = '<a href="/wiki/Користувач:' + mw.util.wikiUrlencode(rv.user) + '">' + rv.user + '</a> (<a href="/wiki/Стіна_обговорення:' + mw.util.wikiUrlencode(rv.user) + '">Обговорення</a> | <a href="/wiki/Спеціальна:Contributions/' + mw.util.wikiUrlencode(rv.user) + '">Вклад</a>' + (/(bureaucrat|sysop|helper|vstf|staff)/.test(mw.config.get('wgUserGroups').join(' ')) ? ' | <a href="/wiki/Special:Block/' + mw.util.wikiUrlencode(rv.user) + '">Блокувати</a>' : '') + ')';
			html = 'Останнє редагування користувачем $1 $2'.replace(/\$1/g, '<img class="lastEdited-avatar"/>' + user).replace(/\$2/g, time);
			if (lastEdited.diff && rv.diff.from) {
				html += ' <a style="cursor:pointer" class="lastEdited-diff">(порівняти)</a>';
			}
			if (lastEdited.comment && rv.parsedcomment) {
				if (rv.parsedcomment.indexOf('Created page with') > -1) {
					html += '<br />Коментар: Створена сторінка';
				} else {
					html += '<br />Коментар: ' + rv.parsedcomment;
				}
			}
			if (lastEdited.size) {
				html += '<br>Розмір: ' + rv.size + ' байт';
			}
			$('.lastEdited').html(html);
			if (lastEdited.avatar) {
				$.get('/api/v1/User/Details', {
					ids: rv.userid,
					size: 15
				}, function(data) {
					$('.lastEdited-avatar').attr({
						src: data.items[0].avatar
					}).after('&nbsp;');
				});
			}
			$('.timeago').timeago();
			mw.util.addCSS('.lastEdited-diff-changes {max-height: ' + ($(window).height() - 250) + 'px;overflow: auto; padding: 5px;}.lastEdited-diff-changes td {padding: 5px;width: 50%;}.lastEdited-diff-changes .diff-marker {width: auto;}');
			mw.loader.using(['mediawiki.action.history.diff'], function() {
				$('.lastEdited-diff').on('click', function() {
					$.showCustomModal('Зміни: ' + mw.config.get('wgPageName').replace(/_/g, ' '), '<div class="lastEdited-diff-changes WikiaArticle"><table>' + rv.diff['*'] + '</table></div>', {
						id: 'lastEdited-diff',
						width: 800,
						buttons: [{
							message: 'Пряме посилання',
							defaultButton: true,
							handler: function() {
								$('#lastEdited-diff').closeModal();
								window.open('/?diff=' + rv.diff.to, '_blank');
							}
								}, {
							message: 'Скасувати',
							handler: function() {
								$('#lastEdited-diff').closeModal();
								window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
							}
								}, {
							message: 'Закрити',
							handler: function() {
								$('#lastEdited-diff').closeModal();
							}
								}]
					});
				});
			});
		});
	}
	console.log('LastEdited loaded');
});