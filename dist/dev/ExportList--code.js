;(function($, mw) {
	var msg;
	
	function addToExportList(page) {
		pages2export = localStorage.getItem('pages2export') === null ? [] : JSON.parse(localStorage.getItem('pages2export'));
		if(!pages2export.includes(page)) {
			pages2export.push(page);
		}
		localStorage.setItem('pages2export', JSON.stringify(pages2export));
	
		showExportList();
	}
	
	function showExportList() {
		if(!$('.exportList').length) {
			$('#WikiaRail').prepend(
				$('<section>', {class: 'exportList rail-module'}).append(
					$('<h2>', {class: 'rail-module__header'}).text(msg('exportList').plain()),
					$('<ul>'),
					$('<a>', {class: 'exportPages'}).text(msg('start').plain())
				)
			);
		}
		else {
			$('.exportList').show();
		}
		updateExportList();
	}
	
	function updateExportList() {
		pages2export = localStorage.getItem('pages2export') === null ? [] : JSON.parse(localStorage.getItem('pages2export'));
		if(pages2export.length) {
			if($('.exportList > ul').length) {
				$('.exportList > ul').empty();
			}
			else {
				$('.exportList > i').remove();
				$('.exportList').append(
					$('<ul>'),				
					$('<a>', {class: 'exportPages'}).text(msg('start').plain())
				);
			}
			$('.exportList > a.exportPages').click(startExportPages.bind(this, pages2export));
			pages2export.forEach(function(page) {
				$('.exportList > ul').append(
					$('<li>').text(page)
				);
			});
		}
		else {
			$('.exportList').html(
				$('<i>').text(msg('nothingToExport').plain())
			);
		}
	}
	
	function startExportPages(pages) {
		console.log('startExportPages',pages);
		window.open(mw.util.getUrl('Special:Export') + pages.reduce(function(url, page, idx) { return url + '&link' + (idx + 1) + '=' + encodeURIComponent(page); },'?'));
	}
	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('ExportList').done(function (i18no) {
			msg = i18no.msg;
			$('.page-header__contribution-buttons > .wds-button-group > .wds-dropdown > .wds-dropdown__content > ul, .page-header__actions .wds-dropdown__content .wds-list').append(
				$('<li>').append($('<a>', {href: mw.util.getUrl('Special:Export/' + mw.config.get('wgPageName'))}).text(msg('export').plain())),	
				$('<li>').append($('<a>').click(addToExportList.bind(this, mw.config.get('wgPageName'))).text(msg('add').plain()))
			);
			showExportList();
		});
	});
	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})( window.jQuery, window.mediaWiki);