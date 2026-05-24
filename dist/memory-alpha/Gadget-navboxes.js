'use strict';
(() => {
	if (!$('.nav-simple, .navbox-group').length){
		return;
	}
	
	const pages = [];
	const linkClass = 'page-without-navbox';
	const oldNavbox = $('.nav-simple td');
	const navbox = oldNavbox.length ? oldNavbox : $('.navbox-group ul');
	const links = navbox.find('a[href]');
	const config = mw.config.values;
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	}});
	
	links.each((index, link) => pages.push($(link).attr('title')));
	api.get({
		prop: 'templates',
		tllimit: 'max',
		formatversion: 2,
		tltemplates: `${config.wgFormattedNamespaces[10]}:${config.wgTitle}`,
		titles: pages,
	}).then(output => {
		output.query.pages.forEach(page => {
			if (!page.templates){
				navbox.find(`a[title="${page.title}"]`).addClass(linkClass);
			}
		});
	});
})();

// {{JavaScript category}}