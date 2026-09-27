/* == Страницы категорий == */
/* === Популярные страницы === */
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
	var header = document.querySelector('.category-page__trending-pages-header');
	var list = document.querySelector('.category-page__trending-pages');
	if (mw.config.get('wgNamespaceNumber') !== 14 || !header || !list) {
		return;
	}
	var titles = [].slice.call(list.querySelectorAll('a[href]')).map(function (link) {
		var title = mw.util.getParamValue('title', link.href);
		if (title) {
			return title.replace(/_/g, ' ');
		}
		var path = link.getAttribute('href').split('#')[0].split('?')[0];
		var match = path.match(/\/wiki\/(.+)$/);
		return match ? decodeURIComponent(match[1]).replace(/_/g, ' ') : '';
	}).filter(function (title, index, all) {
		return title && all.indexOf(title) === index;
	});
	if (!titles.length) {
		return;
	}
	new mw.Api().get({
		action:'query',
		titles:titles.slice(0, 20).join('|'),
		prop:'categories',
		clcategories:mw.config.get('wgPageName').replace(/_/g, ' '),
		cllimit:'max',
		redirects:1,
		formatversion:2
	}).then(function (data) {
		var pages = (data.query && data.query.pages) || [];
		var inside = pages.some(function (page) {
			return page.categories && page.categories.length;
		});
		if (!inside) {
			header.style.display = 'none';
			list.style.display = 'none';
		}
	});
});