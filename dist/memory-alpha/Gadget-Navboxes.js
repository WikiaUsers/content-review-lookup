'use strict';
mw.loader.using(['mediawiki.api'], () => {
	if (!$('.nav-simple, .navbox-group').length){
		return;
	}
	
	const api = new mw.Api();
	const config = mw.config.get([
		'wgFormattedNamespaces',
		'wgTitle',
	]);
	const pages = [];
	const linkClass = 'page-without-navbox';
	const oldNavbox = $('.nav-simple td');
	const navbox = oldNavbox.length ? oldNavbox : $('.navbox-group ul');
	const links = navbox.find('a[href]');
	
	links.each((index, link) => pages.push($(link).attr('title')));
	api.get({
		prop: 'templates',
		tllimit: 'max',
		formatversion: 2,
		tltemplates: `${config.wgFormattedNamespaces[10]}:${config.wgTitle}`,
		titles: pages.join('|'),
	}).done((output) => {
		output.query.pages.forEach((page) => {
			if (!page.templates){
				navbox.find(`a[title="${page.title}"]`).addClass(linkClass);
			}
		});
	});
});