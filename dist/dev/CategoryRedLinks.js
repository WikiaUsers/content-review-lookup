'use strict';
$(() => {
	if (window.CategoryRedLinksLoaded || !mw.config.get('wgUserName')) {
		return;
	}
	window.CategoryRedLinksLoaded = true;
	$('a.newcategory[href]').each((index, link) => {
		$(link).addClass('new');
		$(link).attr('href', `${$(link).attr('href')}?action=edit&redlink=1`);
	});
});