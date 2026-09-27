'use strict';
(async () => {
	const navLinks = $('.navbox-group').find('li, dd').find('a[href]');

	if (!navLinks.length) {
		return;
	}

	const pages = [];
	const linkClass = 'page-without-navbox';
	const config = mw.config.values;
	const api = new mw.Api({parameters: {
		action: 'query',
		format: 'json',
		formatversion: 2,
		errorformat: 'plaintext',
		uselang: config.wgUserLanguage,
	}});
	navLinks.each((index, link) => pages.push($(link).attr('title')));
	const output = await api.get({
		prop: 'templates',
		tllimit: 'max',
		tltemplates: `${config.wgFormattedNamespaces[10]}:${config.wgTitle}`,
		titles: pages,
	});

	for (const page of output.query.pages) {
		if (!page.templates) {
			navLinks.filter(`[title="${page.title}"]`).addClass(linkClass);
		}
	}
})();

// {{JavaScript category}}