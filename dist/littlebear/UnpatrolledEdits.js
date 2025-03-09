$(() => {
	const specialPageName = 'Special:BlankPage/UnpatrolledEdits';
	const groups = ['content-moderator', 'helper', 'staff', 'sysop', 'wiki-specialist'];
	const groupCount = groups.filter((group) => mw.config.get('wgUserGroups').indexOf(group) !== -1).length;
	const api = new mw.Api();
	const messages = [
		'pagetitle',
		'custom-UnpatrolledEdits-title',
		'custom-UnpatrolledEdits-summary',
		'specialpage-empty',
	];
	
	if (mw.config.get('wgPageName') !== specialPageName || !groupCount){
		return;
	}
	
	api.get({
		list: 'recentchanges',
		rcprop: 'title|ids',
		rcshow: '!patrolled',
		rclimit: '5000',
	}).done((rc) => {
		api.loadMessagesIfMissing(messages).done(() => {
			const title = mw.message('custom-UnpatrolledEdits-title').text();
			const changes = rc.query.recentchanges;
			
			document.title = mw.message('pagetitle', title).text();
			$('#firstHeading, .wiki-page-header__title').html(title);
			$('#mw-content-text p').html(mw.message('custom-UnpatrolledEdits-summary').text());
			
			if (changes.length === 0){
				$('#mw-content-text p').after(mw.message('specialpage-empty').text());
				return;
			}
			
			const list = $('<ul>');
			
			changes.forEach((v) => {
				const pageLink = link(v.title, mw.html.escape(v.title));
				const diffLink = link(`Special:Diff/${v.revid}`, 'diff');
				const item = $('<li>').append(`${pageLink} (${diffLink})`);
				list.append(item);
			});
			
			$('#mw-content-text p').after(list);
			
			function link(page, text = page){
				const newLink = $('<a>');
				newLink.attr('href', mw.util.getUrl(page));
				newLink.attr('title', page);
				newLink.html(text);
				return newLink.prop('outerHTML');
			}
		});
	});
});