$('.page-header__contribution-buttons > .wds-button-group > .wds-dropdown > .wds-dropdown__content > ul, .page-header__actions .wds-dropdown__content .wds-list').append(
	$('<li />').append($('<a />', {href: mw.util.getUrl('Special:Export/' + mw.config.get('wgPageName'))}).text('Export')),	
	$('<li />').append($('<a />').click(addToExportList.bind(this, mw.config.get('wgPageName'))).text('Add to export list'))
);

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
			$('<section />', {class: 'exportList rail-module'}).append(
				$('<h2 />', {class: 'rail-module__header'}).text('Export List'),
				$('<ul />'),
				$('<a />', {class: 'exportPages'}).text('Start Export')
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
				$('<ul />'),				
				$('<a />', {class: 'exportPages'}).text('Start Export')
			);
		}
		$('.exportList > a.exportPages').click(startExportPages.bind(this, pages2export));
		pages2export.forEach(function(page) {
			$('.exportList > ul').append(
				$('<li />').text(page)
			);
		});
	}
	else {
		$('.exportList').html(
			$('<i />').text('No pages to export')
		);
	}
}

function startExportPages(pages) {
	console.log('startExportPages',pages);
	window.open(mw.util.getUrl('Special:Export') + pages.reduce(function(url, page, idx) { return url + '&link' + (idx + 1) + '=' + encodeURIComponent(page); },'?'));
}

showExportList();